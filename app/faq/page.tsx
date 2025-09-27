import { getFaq, getPage } from '@/lib/cms';
import Breadcrumbs from '@/components/Breadcrumbs';
import RichText from '@/components/RichText';
import { draftMode } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const preview = draftMode().isEnabled;
  const [cmsFaq, page] = await Promise.all([
    getFaq(preview),
    getPage('faq', preview),
  ]);
  const faq = cmsFaq.length
    ? cmsFaq
    : [
        {
          question: 'Do you offer local pickup?',
          answer:
            'Yes! Choose local pickup during Square checkout when available. You can also leave a pickup note on the product page.',
        },
        {
          question: 'Do you ship nationwide?',
          answer:
            'We ship select items (like cookies) to most U.S. states. Shipping rates and options appear during checkout.',
        },
        {
          question: 'Do you make custom cakes?',
          answer:
            'Absolutely. Send us a message with your theme, size, and date. We will confirm availability and a quote.',
        },
      ];

  return (
    <div className="pt-8">
      <section className="container py-16">
        <Breadcrumbs items={[{ label: 'FAQ', url: '/faq' }]} />
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            {page?.title ?? 'Frequently Asked Questions'}
          </h1>
          <div className="max-w-2xl mx-auto text-lg text-gray-600">
            {Array.isArray(page?.content) ? (
              <RichText value={page?.content} />
            ) : (
              <p>
                Got questions? We have got answers! Find everything you need to know about our bakery, orders, and services.
              </p>
            )}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          {faq.map((f, i) => (
            <div key={i} className="card p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand/10 to-brand/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-brand transition-colors duration-200">
                    {f.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{f.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              {page?.ctaTitle ?? 'Still have questions?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {page?.ctaDescription ??
                'Cannot find what you are looking for? We are here to help! Contact us directly and we will get back to you as soon as possible.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(page?.ctas && page?.ctas.length ? page.ctas : [
                { label: 'Contact Us', href: '/about' },
                { label: 'Browse Products', href: '/shop' },
              ]).map((cta, index) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  className={
                    index === 0
                      ? 'btn btn-brand'
                      : 'btn bg-white border border-brand/20 text-brand hover:bg-brand/5'
                  }
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
