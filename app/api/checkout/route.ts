import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const isProd = process.env.SQUARE_ENVIRONMENT === 'production';
const BASE = isProd
  ? 'https://connect.squareup.com/v2'
  : 'https://connect.squareupsandbox.com/v2';

const headers = {
  Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN ?? ''}`,
  'Content-Type': 'application/json',
  'Square-Version': '2024-07-17',
};

type CartPayload = {
  items: Array<{ variationId?: string; id?: string; qty: number; note?: string }>;
  redirectUrl?: string;
};

export async function POST(req: Request) {
  try {
    const ct = req.headers.get('content-type') || '';
    let line_items: any[] = [];
    let redirectUrl: string | undefined;

    // Compute a fallback base URL from request headers (works on Vercel previews)
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
    const proto =
      req.headers.get('x-forwarded-proto') ||
      (host.includes('localhost') || host.startsWith('127.') ? 'http' : 'https');
    const computedBase = host ? `${proto}://${host}` : undefined;

    if (ct.includes('application/json')) {
      // JSON (optional — you’re using form mode below, but we keep both)
      const payload = (await req.json()) as CartPayload;
      redirectUrl = payload.redirectUrl ?? undefined;
      line_items = (payload.items ?? []).map((i) => ({
        catalog_object_id: i.variationId || i.id,
        quantity: String(Math.max(1, Number(i.qty) || 1)),
        note: i.note,
      }));
    } else {
      // FORM mode (used by the cart + “Buy Now”)
      const form = await req.formData();

      // 3A) Whole cart as JSON string (what your cart page posts)
      const payloadStr = (form.get('payload') as string) || '';
      if (payloadStr) {
        const payload = JSON.parse(payloadStr) as CartPayload;
        redirectUrl = payload.redirectUrl ?? undefined;
        line_items = (payload.items ?? []).map((i) => ({
          catalog_object_id: i.variationId || i.id,
          quantity: String(Math.max(1, Number(i.qty) || 1)),
          note: i.note,
        }));
      } else {
        // 3B) Single-item “Buy Now” fallback
        const id = String(form.get('variationId') || form.get('id') || '').trim();
        const qty = Number(form.get('qty') || 1);
        const note = String(form.get('note') || '');
        redirectUrl = (form.get('redirectUrl') as string) || undefined;

        if (!id) {
          return NextResponse.json(
            { error: 'Missing item id/variationId' },
            { status: 400 }
          );
        }
        line_items = [
          {
            catalog_object_id: id,
            quantity: String(Math.max(1, qty)),
            note,
          },
        ];
      }
    }

    if (!line_items.length) {
      return NextResponse.json(
        { error: 'No items provided for checkout' },
        { status: 400 }
      );
    }

    const body = {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: process.env.SQUARE_LOCATION_ID,
        line_items,
      },
      checkout_options: {
        ask_for_shipping_address: true,
        redirect_url:
          redirectUrl ||
          (process.env.NEXT_PUBLIC_BASE_URL
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/thanks`
            : computedBase
            ? `${computedBase}/thanks`
            : undefined),
      },
    };

    const res = await fetch(`${BASE}/online-checkout/payment-links`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });

    const url = data?.payment_link?.url;
    if (!url) {
      return NextResponse.json({ error: 'No checkout URL returned' }, { status: 500 });
    }

    return NextResponse.redirect(url, { status: 303 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
