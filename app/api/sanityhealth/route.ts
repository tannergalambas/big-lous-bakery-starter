import { NextResponse } from 'next/server';
import { sanity, isSanityEnabled } from '@/lib/sanity';

export const runtime = 'nodejs';

function normalize(v?: string | null) {
  if (!v) return '';
  const t = v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  return t;
}

export async function GET() {
  // Allow fallback to NEXT_PUBLIC_* to make previews work even if misconfigured
  const projectId = normalize(
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  );
  const dataset = normalize(
    process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET
  );

  const idOk = /^[a-z0-9-]+$/.test(projectId);
  const dsOk = /^[a-z0-9-]+$/.test(dataset);

  let fetchOk = false;
  let sampleId: string | null = null;
  let errorMsg: string | undefined;

  if (isSanityEnabled) {
    try {
      const sample = await sanity.fetch("*[_type=='page'][0]{_id}");
      sampleId = sample?._id ?? null;
      fetchOk = true;
    } catch (e: any) {
      fetchOk = false;
      errorMsg = e?.message ?? 'Fetch failed';
    }
  }

  return NextResponse.json({
    configured: isSanityEnabled,
    env: {
      projectIdPresent: Boolean(projectId),
      datasetPresent: Boolean(dataset),
      projectIdValid: idOk,
      datasetValid: dsOk,
    },
    fetch: {
      ok: fetchOk,
      sampleId,
      error: errorMsg,
    },
  });
}
