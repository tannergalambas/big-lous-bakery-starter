
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
    <div className="rounded-xl border p-3 bg-white shadow-sm">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/5">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name || 'Product image'}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 25vw, 50vw"
            />
          ) : (
            <div className="grid place-items-center h-full text-sm opacity-60">
              No image
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="font-medium line-clamp-1">
            {product.name || 'Untitled'}
          </div>
          <div className="text-sm opacity-70">
            {formatMoney(price, product.currency || 'USD')}
          </div>
        </div>
      </Link>
    </div>
  );
}