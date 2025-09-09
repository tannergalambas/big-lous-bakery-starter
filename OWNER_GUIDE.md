# Big Lou's Bakery – Owner Guide

This guide shows how to update your website without code using Sanity.

## Where to edit
- Homepage: Edit hero title, subtitle, image, and buttons (ctas).
- Navigation: Manage header and footer links.
- Site Settings: Site name, email, address, hours, social links, default SEO, featured products.
- Pages: Create content pages. Use “Parent Page (optional)” for hierarchy; “Order” for sorting; “Hide From Navigation” to exclude from menus; “Navigation Label” to override the title in menus.
- FAQ Items: Add questions/answers. Use “Order” to control the list.

## Preview drafts
- Open Preview from the “Preview” tab on Homepage and Pages.
- Disable draft mode via the same tab or by visiting `/api/preview/disable`.

## Tips
- Publish to make changes live.
- Images: upload large, wide images for the homepage hero.
- Featured products: paste Square item/variation IDs into Site Settings → featuredProductIds to pin items first on the homepage.

## Troubleshooting
- Health checks: `/api/sanityhealth` and `/api/squarehealth`.
- If a change doesn’t appear, reload the page or re-publish the document.

Contact your developer if you need a new section type or automated menus from the page hierarchy.
