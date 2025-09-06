import Image from 'next/image';
import { getPage } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const cms = await getPage('about');

  const title = cms?.title ?? "About Big Lou's Bakery";
  const content =
    cms?.content ??
    "We’re a family-run bakery passionate about scratch-made cookies, custom cakes, and seasonal pies. Everything is baked fresh with simple ingredients and a whole lot of heart.";
  const image =
    cms?.image ??
    '/A50EBEF1-3C66-4DF6-A00B-F4031DF26BBC_4_5005_c.jpeg';

  return (
    <section className="container py-10">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-accent/10">
          <Image
            src={image}
            alt="Inside the bakery"
            fill
            className="object-cover"
            sizes="(min-width:1024px) 40vw, 90vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="opacity-80 leading-relaxed whitespace-pre-line">{content}</p>

          <div className="mt-6 grid gap-2 text-sm opacity-80">
            <div>
              <span className="font-semibold">Hours:</span> Tue–Sat 8am–4pm
            </div>
            <div>
              <span className="font-semibold">Address:</span> 123 Main St, Hometown, USA
            </div>
            <div>
              <span className="font-semibold">Email:</span> hello@biglous.example
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

