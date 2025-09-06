import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Story & Baking Tradition',
  description: 'Learn about Big Lou\'s Bakery - our story, baking traditions, and commitment to using premium ingredients and traditional methods for the finest handcrafted treats.',
  openGraph: {
    title: 'About Us - Our Story & Baking Tradition',
    description: 'Learn about Big Lou\'s Bakery - our story, baking traditions, and commitment to quality.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}