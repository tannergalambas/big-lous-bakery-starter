// app/page.tsx
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import BrandTicker from '@/components/BrandTicker';
import InstagramFeed from '@/components/InstagramFeed';
import NewsletterSignup from '@/components/NewsletterSignup';
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
    // Silently handle parsing errors in production
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

      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4" style={{lineHeight: '1.2', paddingBottom: '0.25rem'}}>Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our most popular handcrafted treats, baked fresh daily with love and the finest ingredients.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-brand/10 rounded-full flex items-center justify-center group hover:scale-110 transition-all duration-300 animate-glow">
              <svg className="w-12 h-12 text-brand/60 group-hover:text-brand transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold gradient-text mb-4">No products yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">
              Add items in your Square Sandbox and refresh to see your delicious products here.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-brand btn-enhanced hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Products
              </span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {items.slice(0, 8).map((p, index) => (
                <div 
                  key={p.id} 
                  className="animate-fade-in opacity-0" 
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            
            {items.length > 8 && (
              <div className="text-center mt-12 animate-fade-in" style={{animationDelay: '1s'}}>
                <a href="/shop" className="btn btn-brand btn-enhanced hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative group">
                  <span className="flex items-center gap-2 relative z-10">
                    View All Products
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/80 to-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                </a>
              </div>
            )}
          </>
        )}
      </section>

      <BrandTicker />

      <InstagramFeed />

      <NewsletterSignup />

      {/* Trust indicators section */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand/10 to-brand/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Fresh Made to Order</h3>
            <p className="text-gray-600">Made fresh when you order with premium ingredients</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand/10 to-brand/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Local Pickup</h3>
            <p className="text-gray-600">Convenient pickup available at our bakery location</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand/10 to-brand/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Custom Orders</h3>
            <p className="text-gray-600">Personalized cakes and treats for special occasions</p>
          </div>
        </div>
      </section>
    </div>
  );
}