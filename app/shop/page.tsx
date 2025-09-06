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
    <div className="min-h-screen pt-8">
      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Our Bakery</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore our complete collection of handcrafted treats. From classic cookies to custom celebration cakes, 
            every item is made fresh daily with premium ingredients and traditional baking methods.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-accent/20 to-brand/10 rounded-2xl flex items-center justify-center">
              <svg className="w-16 h-16 text-brand/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No Products Available</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              We're currently updating our product catalog. Please check back soon or contact us directly for special orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => window.location.reload()} className="btn btn-brand">
                Refresh Catalog
              </button>
              <a href="/about" className="btn bg-white border border-brand/20 text-brand hover:bg-brand/5">
                Contact Us
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-brand">{items.length}</span> delicious {items.length === 1 ? 'item' : 'items'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Baked fresh daily</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {items.map((p: any, index: number) => (
                <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="mt-16 text-center">
              <div className="card p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-3">Looking for something special?</h3>
                <p className="text-gray-600 mb-6">
                  We create custom cakes and treats for birthdays, weddings, and special occasions. 
                  Contact us to discuss your perfect dessert!
                </p>
                <a href="/about" className="btn btn-brand">
                  Request Custom Order
                </a>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}