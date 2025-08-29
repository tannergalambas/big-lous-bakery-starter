// app/api/products/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const isProd = process.env.SQUARE_ENVIRONMENT === 'production';
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