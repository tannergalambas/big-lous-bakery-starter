import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function present(v?: string) {
  return Boolean(v && v.trim());
}

export async function GET() {
  const payload = {
    runtime: {
      nodeEnv: process.env.NODE_ENV || null,
      vercelEnv: process.env.VERCEL_ENV || null,
    },
    sanity: {
      projectIdPresent: present(process.env.SANITY_PROJECT_ID) || present(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
      datasetPresent: present(process.env.SANITY_DATASET) || present(process.env.NEXT_PUBLIC_SANITY_DATASET),
      usingNextPublicFallback: !present(process.env.SANITY_PROJECT_ID) && present(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    },
    square: {
      accessTokenPresent: present(process.env.SQUARE_ACCESS_TOKEN),
      locationIdPresent: present(process.env.SQUARE_LOCATION_ID),
      environment: process.env.SQUARE_ENVIRONMENT || null,
    },
    site: {
      baseUrlPresent: present(process.env.NEXT_PUBLIC_BASE_URL),
    },
  };

  return NextResponse.json(payload);
}
