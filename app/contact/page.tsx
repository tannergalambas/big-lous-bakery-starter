import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import RichText from '@/components/RichText';
import { getPage, getSiteSettings } from '@/lib/cms';
import { draftMode } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const preview = draftMode().isEnabled;
  const [page, settings] = await Promise.all([
    getPage('contact', preview),
    getSiteSettings(preview),
  ]);

  const title = page?.title ?? 'Contact Us';
  const intro = Array.isArray(page?.content) ? page?.content : null;
  const fallbackIntro =
    "Have questions about our products or want to place a custom order? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.";

  const address = settings?.address ?? 'Austin, Texas';
  const email = settings?.email ?? 'hello@biglous.example';
  const phone = settings?.phone ?? '(512) 555-0134';
  const hours = settings?.hours;
  const ctaTitle = page?.ctaTitle ?? 'Need something custom?';
  const ctaDescription =
    page?.ctaDescription ?? 'Include your event date, guest count, and flavor ideas. We love crafting desserts made just for you!';
  const ctas =
    page?.ctas && page?.ctas.length
      ? page.ctas
      : [];

  return (
    <div className="pt-8">
      <section className="container py-16">
        <Breadcrumbs items={[{ label: 'Contact', url: '/contact' }]} />
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6" style={{ lineHeight: '1.2', paddingBottom: '0.25rem' }}>
            {title}
          </h1>
          <div className="max-w-2xl mx-auto text-lg text-gray-600">
            {intro ? <RichText value={intro} /> : <p>{fallbackIntro}</p>}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6 text-brand">Send us a Message</h2>
            <ContactForm
              onSuccessMessage="We've received your message and will get back to you soon."
              submitLabel={settings?.contactFormSubmitLabel}
            />
          </div>

          <div className="card p-8 bg-white/80 backdrop-blur">
            <h3 className="text-xl font-semibold mb-4 text-brand">Bakery Details</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>
                  <span className="font-semibold text-gray-800">Location:</span>
                  <br />
                  {address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>
                  <span className="font-semibold text-gray-800">Email:</span>
                  <br />
                  <a href={`mailto:${email}`} className="text-brand hover:underline">
                    {email}
                  </a>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l3-8H6.4m0 0L5 5m1.4 2l1.2 6m6.4 7a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>
                  <span className="font-semibold text-gray-800">Phone:</span>
                  <br />
                  <a href={`tel:${phone}`} className="text-brand hover:underline">
                    {phone}
                  </a>
                </p>
              </div>

              {hours ? (
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-brand mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    <span className="font-semibold text-gray-800">Hours:</span>
                    <br />
                    <span className="whitespace-pre-line">{hours}</span>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-8 p-6 bg-brand/5 rounded-2xl border border-brand/10 text-center md:text-left">
              <h4 className="font-semibold text-lg mb-2 text-brand">{ctaTitle}</h4>
              <p className="text-gray-600 mb-4">{ctaDescription}</p>
              {ctas.length ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  {ctas.map((cta, index) => (
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
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
