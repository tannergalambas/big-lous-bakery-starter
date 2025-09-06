
'use client';

import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number | string | null;
  currency?: string;
  image?: string | null;
};

function formatMoney(
  v: number | string | null | undefined,
  currency = 'USD'
) {
  const n =
    typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(n);
}

export default function ProductCard({ product }: { product: Product }) {
  const price =
    typeof product.price === 'string'
      ? Number(product.price)
      : product.price ?? 0;

  return (
    <div className="group relative rounded-2xl border border-accent/20 p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-cream/30 to-accent/20 mb-4">
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name || 'Product image'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                sizes="(min-width:1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="grid place-items-center h-full text-sm opacity-60 bg-gradient-to-br from-cream to-accent/30">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-accent/40 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                No image
              </div>
            </div>
          )}
          
          {/* Elegant overlay badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-brand transition-colors duration-200">
            {product.name || 'Untitled'}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-brand">
              {formatMoney(price, product.currency || 'USD')}
            </span>
            <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}