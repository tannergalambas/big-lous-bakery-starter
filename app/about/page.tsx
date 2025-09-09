import Image from 'next/image';
import { getPage } from '@/lib/cms';
import RichText from '@/components/RichText';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const cms = await getPage('about');

  const title = cms?.title ?? "About Big Lou's Bakery";
  const content = cms?.content ??
    "We're a family-run bakery passionate about scratch-made cookies, custom cakes, and seasonal pies. Everything is baked fresh with simple ingredients and a whole lot of heart.";
  const image =
    cms?.image ??
    '/A50EBEF1-3C66-4DF6-A00B-F4031DF26BBC_4_5005_c.jpeg';

  return (
    <div className="pt-8">
      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6" style={{lineHeight: '1.15', paddingBottom: '0.25rem'}}>{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Learn more about our story, our passion for baking, and what makes Big Lou's Bakery special.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src={image}
              alt="Inside the bakery"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(min-width:1024px) 40vw, 90vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>

          <div className="space-y-6">
            <div className="card p-8">
              {Array.isArray(content) ? (
                <RichText value={content} />
              ) : (
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{content as any}</p>
              )}
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4 text-brand">Contact Info</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><span className="font-semibold">Location:</span> Austin, Texas</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span><span className="font-semibold">Email:</span> hello@biglous.example</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">Ready to try our treats?</h3>
            <p className="text-gray-600 mb-6">
              Browse our selection of fresh-baked goods or contact us for custom orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/shop" className="btn btn-brand">
                Shop Now
              </a>
              <a href="/faq" className="btn bg-white border border-brand/20 text-brand hover:bg-brand/5">
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
