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
      <body className="min-h-screen flex flex-col bg-stone-100 text-stone-900 relative overflow-x-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-brand/5 to-accent/10 rounded-full blur-3xl floating-particle"></div>
          <div className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-br from-accent/5 to-brand/5 rounded-full blur-3xl floating-particle" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-brand/8 to-transparent rounded-full blur-2xl floating-particle" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Global nav once */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 pb-4 relative z-10">{children}</main>

        {/* Global footer once */}
        <Footer />
      </body>
    </html>
  );
}