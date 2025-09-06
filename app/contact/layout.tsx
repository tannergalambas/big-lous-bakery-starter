import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch for Custom Orders',
  description: 'Contact Big Lou\'s Bakery for custom cake orders, catering inquiries, and general questions. We\'re here to help with all your bakery needs.',
  openGraph: {
    title: 'Contact Us - Get in Touch for Custom Orders',
    description: 'Contact Big Lou\'s Bakery for custom cake orders, catering inquiries, and general questions.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}