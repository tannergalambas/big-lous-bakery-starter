// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/cart';

export default function Navbar() {
  const count = useCart((s) => s.count);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-accent/30 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand/80 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-200">
            BL
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-brand to-brand/80 bg-clip-text text-transparent">
            Big Lou&apos;s Bakery
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/shop" className="relative py-2 text-gray-700 hover:text-brand transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-200 hover:after:w-full">
            Shop
          </Link>
          <Link href="/about" className="relative py-2 text-gray-700 hover:text-brand transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-200 hover:after:w-full">
            About
          </Link>
          <Link href="/faq" className="relative py-2 text-gray-700 hover:text-brand transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-200 hover:after:w-full">
            FAQ
          </Link>
        </nav>

        <Link href="/cart" className="btn btn-brand relative group overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
            Cart ({count})
          </span>
          <div className="absolute inset-0 bg-brand/80 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
        </Link>
      </div>
    </header>
  );
}
