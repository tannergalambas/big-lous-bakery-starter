import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');
  const redirect = url.searchParams.get('redirect') || '/';

  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(redirect, url.origin));
}

