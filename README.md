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

## Colors (pulled from logo)
- brand: #12332e
- accent: #cac2b0
- cream:  #e9e7e2
- ink:    #1f2937

Adjust or add shades in `tailwind.config.js`.
