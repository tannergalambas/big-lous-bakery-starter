import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  draftMode().disable();
  const url = new URL(req.url);
  const redirect = url.searchParams.get('redirect') || '/';
  return NextResponse.redirect(new URL(redirect, url.origin));
}

