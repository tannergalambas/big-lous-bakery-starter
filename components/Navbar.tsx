// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/cart';

export default function Navbar() {
  const count = useCart((s) => s.count);

  return (
    <header className="bg-white/80 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          {/* Optional logo image; remove if you don't use one */}
          {/* <Image src="/logo.svg" alt="Big Lou's" width={32} height={32} /> */}
          <span className="text-xl font-semibold">Big Lou&apos;s</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/shop" className="hover:opacity-80">Shop</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
          <Link href="/faq" className="hover:opacity-80">FAQ</Link>
        </nav>

        <Link href="/cart" className="btn btn-brand">
          Cart ({count})
        </Link>
      </div>
    </header>
  );
}