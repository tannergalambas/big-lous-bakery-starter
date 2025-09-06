# Big Lou's Bakery – Next.js + Square + Sanity Starter

This is a minimal starter that pulls **products from Square**, creates **Square Payment Links** for checkout,
and leaves room for **Sanity**-powered content pages.

## Quick start
1) `cp .env.example .env.local` and fill values:
- `SQUARE_ACCESS_TOKEN` (Sandbox for testing)
- `SQUARE_LOCATION_ID`
- `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- (Optional) `SANITY_PROJECT_ID` + `SANITY_DATASET`

2) `npm install`
3) `npm run dev`

## Square setup
- Add products in **Square Dashboard → Items**. Variations/prices appear automatically.
- Shipping & Local Pickup are configured in Square. The checkout page will handle addresses.
- The product page includes a "Pickup note" field (stored on the line item).

## Sanity (optional)
- If you want editable About/FAQ/Hours, run `npm create sanity@latest` and add your schemas.
- Put credentials in `.env.local` and query with `lib/sanity.ts`.

### Example Sanity Schemas
Add these in your Sanity Studio (e.g., `schemas/page.ts` and `schemas/faqItem.ts`) and include them in your schema export.

page.ts
```ts
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'content', type: 'text' },
    { name: 'image', type: 'image', options: { hotspot: true } },
  ],
};
```

faqItem.ts
```ts
export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    { name: 'order', type: 'number' },
    { name: 'question', type: 'string', validation: (r: any) => r.required() },
    { name: 'answer', type: 'text' },
  ],
};
```

This repo already includes optional pages that query Sanity if configured:
- `app/about/page.tsx` – uses `getPage('about')` with a graceful fallback
- `app/faq/page.tsx` – uses `getFaq()` with a graceful fallback
- `app/thanks/page.tsx` – Square redirect target

Set these env vars when using Sanity (public datasets recommended for read-only):
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`

### Sanity Health Check
- Endpoint: `GET /api/sanityhealth` returns a small JSON diagnostic (no secrets).

### Square Health Check
- Endpoint: `GET /api/squarehealth` validates env vars and attempts a minimal API call
  - Shows if access token is present, selected environment (sandbox/production), and whether a fetch succeeds.
  - Also returns number of locations and a sample catalog item id if available.

## Colors (pulled from logo)
- brand: #12332e
- accent: #cac2b0
- cream:  #e9e7e2
- ink:    #1f2937

Adjust or add shades in `tailwind.config.js`.
