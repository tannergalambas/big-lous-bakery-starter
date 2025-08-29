// app/shop/page.tsx
import ProductCard from '@/components/ProductCard';
import { headers } from 'next/headers';

async function fetchProducts() {
  // Build an absolute base URL from the incoming request
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host'); // Vercel/Proxy or local
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const base = `${proto}://${host}`;

  const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
  if (!res.ok) return { items: [] };
  return res.json();
}

export default async function ShopPage() {
  const { items = [] } = await fetchProducts();

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      {items.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}