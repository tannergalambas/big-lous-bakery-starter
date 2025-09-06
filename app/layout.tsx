// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quicksand, pacifico, raleway } from '@/lib/fonts';

export const metadata: Metadata = {
  title: "Big Lou's Bakery",
  description: 'Fresh-baked cookies, custom cakes, and pies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${quicksand.className}`}>
      <body className="min-h-screen flex flex-col bg-stone-100 text-stone-900">
        {/* Global nav once */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Global footer once */}
        <Footer />
      </body>
    </html>
  );
}