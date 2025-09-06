import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function normalize(v?: string | null) {
  if (!v) return '';
  const t = v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  return t;
}

export async function GET() {
  const accessToken = normalize(process.env.SQUARE_ACCESS_TOKEN);
  const env = normalize(process.env.SQUARE_ENVIRONMENT) || 'sandbox';
  const locationId = normalize(process.env.SQUARE_LOCATION_ID);

  const isProd = env === 'production';
  const BASE = isProd
    ? 'https://connect.squareup.com/v2'
    : 'https://connect.squareupsandbox.com/v2';

  const headers: Record<string, string> = {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    'Content-Type': 'application/json',
    'Square-Version': '2024-07-17',
  };

  const configured = Boolean(accessToken) && (env === 'production' || env === 'sandbox');

  let fetchOk = false;
  let status: number | null = null;
  let error: string | undefined;
  let locations: number | undefined;
  let sampleItemId: string | null = null;

  if (configured) {
    try {
      // 1) Quick auth check via Locations API
      const locRes = await fetch(`${BASE}/locations`, { headers, cache: 'no-store' });
      status = locRes.status;
      if (!locRes.ok) {
        const text = await locRes.text();
        throw new Error(`Locations error (${locRes.status}): ${text}`);
      }
      const locData = await locRes.json();
      locations = Array.isArray(locData?.locations) ? locData.locations.length : 0;

      // 2) Best-effort: try to read 1 catalog item (won't fail health if empty)
      try {
        const catRes = await fetch(`${BASE}/catalog/list?types=ITEM&limit=1`, {
          headers,
          cache: 'no-store',
        });
        if (catRes.ok) {
          const catData = await catRes.json();
          sampleItemId = catData?.objects?.[0]?.id ?? null;
        }
      } catch {
        // ignore secondary check
      }

      fetchOk = true;
    } catch (e: any) {
      fetchOk = false;
      error = e?.message ?? 'Fetch failed';
    }
  }

  return NextResponse.json({
    configured,
    env: {
      environment: isProd ? 'production' : env === 'sandbox' ? 'sandbox' : 'unknown',
      accessTokenPresent: Boolean(accessToken),
      locationIdPresent: Boolean(locationId),
    },
    fetch: {
      ok: fetchOk,
      status,
      locations,
      sampleItemId,
      error,
    },
  });
}

