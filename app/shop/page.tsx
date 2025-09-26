import Breadcrumbs from '@/components/Breadcrumbs';
import ShopPageClient from '@/components/ShopPageClient';
import { getPage } from '@/lib/cms';
import { draftMode } from 'next/headers';

export const dynamic = 'force-dynamic';

function toPlainText(blocks?: any[]): string | null {
  if (!Array.isArray(blocks)) return null;
  return blocks
    .map((block) =>
      Array.isArray(block?.children)
        ? block.children.map((child: any) => child?.text ?? '').join(' ')
        : '',
    )
    .join(' ')
    .trim();
}

export default async function ShopPage() {
  const preview = draftMode().isEnabled;
  const page = await getPage('shop', preview);

  const title = page?.title ?? 'Our Bakery';
  const description =
    toPlainText(page?.content) ||
    'Explore our complete collection of handcrafted treats. From classic cookies to custom celebration cakes, every item is made fresh daily with premium ingredients and traditional baking methods.';

  return (
    <div className="min-h-screen pt-8">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Shop', url: '/shop' }]} />
      </div>
      <ShopPageClient title={title} description={description} />
    </div>
  );
}
