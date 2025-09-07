// app/api/products/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const isProd = process.env.SQUARE_ENVIRONMENT === 'production';
const HAS_SQUARE = !!process.env.SQUARE_ACCESS_TOKEN;
const BASE = isProd
  ? 'https://connect.squareup.com/v2'
  : 'https://connect.squareupsandbox.com/v2';

const headers: Record<string, string> = {
  Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN ?? ''}`,
  'Content-Type': 'application/json',
  'Square-Version': '2024-07-17',
};

function centsToDollars(a?: number | null) {
  return typeof a === 'number' ? a / 100 : null;
}

type Related = Array<any> | undefined;

function buildImageMap(related: Related) {
  const map = new Map<string, string>();
  for (const r of related ?? []) {
    if (r?.type === 'IMAGE' && r?.id && r?.image_data?.url) {
      map.set(r.id, r.image_data.url);
    }
  }
  return map;
}

function pickImageUrlFromObject(item: any, images: Map<string, string>): string | null {
  const itemImgId = item?.item_data?.image_ids?.[0];
  if (itemImgId && images.has(itemImgId)) return images.get(itemImgId)!;

  const v0 = item?.item_data?.variations?.[0]?.item_variation_data;
  const varImgId = v0?.image_ids?.[0];
  if (varImgId && images.has(varImgId)) return images.get(varImgId)!;

  return null;
}

function normalizeSingleItem(item: any, related: Related) {
  const images = buildImageMap(related);
  const variations = (item?.item_data?.variations ?? []).map((v: any) => {
    const vd = v?.item_variation_data;
    return {
      id: v?.id,
      name: vd?.name ?? 'Default',
      price: centsToDollars(vd?.price_money?.amount),
      currency: vd?.price_money?.currency ?? 'USD',
      image:
        vd?.image_ids?.[0] && images.get(vd.image_ids[0])
          ? images.get(vd.image_ids[0])!
          : null,
    };
  });

  let image = pickImageUrlFromObject(item, images);
  if (!image && variations.length && variations[0].image) {
    image = variations[0].image;
  }

  return {
    id: item?.id,
    name: item?.item_data?.name ?? '',
    description: item?.item_data?.description ?? '',
    price: variations[0]?.price ?? null,
    currency: variations[0]?.currency ?? 'USD',
    image,
    variations,
  };
}

/** Get a single item (used for detail page and list backfill) */
async function getItemById(id: string) {
  const res = await fetch(
    `${BASE}/catalog/object/${encodeURIComponent(id)}?include_related_objects=true`,
    { headers, cache: 'no-store' }
  );
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return normalizeSingleItem(data.object, data.related_objects);
}

/** List items using Search Catalog Items (for image_url), then backfill missing fields via catalog/object */
async function listItemsRobust() {
  // Try to respect the configured location if provided (can help Sandbox)
  const body: any = {};
  if (process.env.SQUARE_LOCATION_ID) {
    body.enabled_location_ids = [process.env.SQUARE_LOCATION_ID];
  }

  const res = await fetch(`${BASE}/catalog/search-catalog-items`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();

  // Initial pass from search-catalog-items
  const initial: Array<{
    id: string;
    name?: string;
    description?: string;
    price?: number | null;
    currency?: string;
    image?: string | null;
  }> = (data.items ?? []).map((i: any) => {
    const v0 = i?.variations?.[0]?.item_variation_data;
    return {
      id: i?.id,
      name: i?.name ?? '',
      description: i?.description ?? '',
      price: centsToDollars(v0?.price_money?.amount),
      currency: v0?.price_money?.currency ?? 'USD',
      image: i?.image_url ?? null,
    };
  });

  // Backfill any items that are missing critical fields (name or price or image)
  const needsBackfill = initial.filter(
    (x) => !x?.name || x.name.trim() === '' || x.price == null || !x.image
  );

  if (needsBackfill.length === 0) return initial;

  const byId = new Map(initial.map((x) => [x.id, x]));

  await Promise.all(
    needsBackfill.map(async (x) => {
      try {
        const filled = await getItemById(x.id);
        const merged = {
          id: filled.id,
          name: filled.name || x.name || '',
          description: filled.description || x.description || '',
          price: filled.price ?? x.price ?? null,
          currency: filled.currency || x.currency || 'USD',
          image: filled.image ?? x.image ?? null,
        };
        byId.set(x.id, merged);
      } catch {
        // If backfill fails, keep the original (at least shows something)
      }
    })
  );

  return Array.from(byId.values());
}

/* ----------------------------- GET ----------------------------- */

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  try {
    // Light mock mode when no Square credentials are present
    if (!HAS_SQUARE) {
      const MOCK: any[] = [
        {
          id: 'mock-1',
          name: "Big Lou's Chocolate Chunk Cookie",
          description: 'Crispy edges, gooey middle, loaded with chocolate chunks.',
          price: 3.5,
          currency: 'USD',
          image: '/chocolate-chunk-cookies.jpeg',
        },
        {
          id: 'mock-2',
          name: 'Signature Cinnamon Roll',
          description: 'Soft roll with brown sugar-cinnamon swirl and cream cheese glaze.',
          price: 4.25,
          currency: 'USD',
          image: '/3DED26DC-832D-46F6-957D-830F1EBB3331_4_5005_c.jpeg',
        },
        {
          id: 'mock-3',
          name: 'Blueberry Lemon Muffin',
          description: 'Bursting with blueberries and a hint of lemon zest.',
          price: 3.0,
          currency: 'USD',
          image: '/282FFA65-692C-461D-8B67-9AFA5514ABE1_4_5005_c.jpeg',
        },
        {
          id: 'mock-4',
          name: 'Classic Apple Pie Slice',
          description: 'Buttery flaky crust with spiced honeycrisp apples.',
          price: 4.5,
          currency: 'USD',
          image: '/A12FD468-BF4B-4089-91FC-AB08BB6D13EF_4_5005_c.jpeg',
        },
        {
          id: 'mock-5',
          name: 'Sea Salt Fudge Brownie',
          description: 'Dense, fudgy chocolate with flaky sea salt.',
          price: 3.75,
          currency: 'USD',
          image: '/77DB1324-FF2E-471E-940B-6E714614DA23_4_5005_c.jpeg',
        },
        {
          id: 'mock-6',
          name: 'Walnut Banana Bread',
          description: 'Moist banana loaf with toasted walnuts and brown butter.',
          price: 5.0,
          currency: 'USD',
          image: '/63A58EBB-29B9-4B83-8973-6112DC671710_4_5005_c.jpeg',
        },
        {
          id: 'mock-7',
          name: 'Zesty Lemon Bar',
          description: 'Tart lemon curd on a buttery shortbread crust.',
          price: 3.25,
          currency: 'USD',
          image: '/0036B461-78BB-4046-BC65-41651D60DB18_4_5005_c.jpeg',
        },
        {
          id: 'mock-8',
          name: 'Chocolate Ganache Cake Slice',
          description: 'Rich chocolate sponge layered with silky ganache.',
          price: 5.5,
          currency: 'USD',
          image: '/8E56CCAD-C999-44CF-8302-34365D17E5D4_4_5005_c.jpeg',
        },
      ];

      if (id) {
        const item = MOCK.find((m) => m.id === id);
        return NextResponse.json({ item: item ?? null });
      }

      return NextResponse.json({ items: MOCK });
    }

    if (id) {
      const item = await getItemById(id);
      return NextResponse.json({ item });
    }

    const items = await listItemsRobust();
    return NextResponse.json({ items });
  } catch (e: any) {
    console.error('[Square API error]', e);
    return NextResponse.json(
      { error: e?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
