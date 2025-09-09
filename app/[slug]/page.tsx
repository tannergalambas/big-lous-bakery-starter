import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPage, getSiteSettings } from '@/lib/cms';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import RichText from '@/components/RichText';

export const dynamic = 'force-dynamic';

type Params = { params: { slug: string } };

export default async function CmsPage({ params }: Params) {
  const preview = draftMode().isEnabled;
  const slug = decodeURIComponent(params.slug);
  const page = await getPage(slug, preview);

  if (!page) return notFound();

  return (
    <div className="pt-8">
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 order-2 md:order-1">
            <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4" style={{lineHeight: '1.15'}}>
              {page.title}
            </h1>
            {page.content && (
              <div className="card p-6">
                {Array.isArray(page.content) ? (
                  <RichText value={page.content} />
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{page.content as any}</p>
                )}
              </div>
            )}
          </div>

          {page.image && (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 40vw, 90vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const preview = draftMode().isEnabled;
  const slug = decodeURIComponent(params.slug);
  const [page, settings] = await Promise.all([
    getPage(slug, preview),
    getSiteSettings(preview),
  ]);
  const title = page?.seo?.metaTitle || page?.title || settings?.seo?.metaTitle;
  const description = page?.seo?.metaDescription || settings?.seo?.metaDescription;
  const ogImage = page?.seo?.ogImage || settings?.seo?.ogImage || '/og-image.jpg';
  return {
    title: title || undefined,
    description: description || undefined,
    openGraph: { title: title || undefined, description: description || undefined, images: [{ url: ogImage }] },
    twitter: { card: 'summary_large_image', title: title || undefined, description: description || undefined, images: [ogImage] },
  };
}
