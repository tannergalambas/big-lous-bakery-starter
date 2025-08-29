// app/page.tsx
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { headers } from 'next/headers';

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: string | number | null;
  currency?: string;
  image?: string | null;
};

async function fetchProducts(): Promise<{ items: Product[] }> {
  // Build an absolute base URL from the request headers
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto =
    h.get('x-forwarded-proto') ??
    (host.includes('localhost') || host.startsWith('127.') ? 'http' : 'https');

  const base = `${proto}://${host}`;

  const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error('Failed to parse /api/products response', {
      status: res.status,
      text,
    });
    return { items: [] };
  }
}

// (optional) ensure this page is always dynamic so it refetches on each request
export const dynamic = 'force-dynamic';

export default async function Page() {
  const { items = [] } = await fetchProducts();

  return (
    <div>
      
      <Hero />

      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-4">Featured</h2>

        {items.length === 0 ? (
          <p className="opacity-70">
            No products yet. Add items in your Square Sandbox and refresh.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
}