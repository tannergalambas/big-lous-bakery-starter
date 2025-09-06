import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Products - Browse Our Complete Bakery Collection',
  description: 'Browse our complete collection of fresh-baked goods including cookies, cakes, pastries, breads, and more. Filter by category to find your perfect treat.',
  openGraph: {
    title: 'Shop All Products - Browse Our Complete Bakery Collection',
    description: 'Browse our complete collection of fresh-baked goods including cookies, cakes, pastries, breads, and more.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}