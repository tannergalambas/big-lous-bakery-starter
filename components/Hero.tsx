import Image from 'next/image';
import { pacifico } from '../lib/fonts';

export default function Hero() {
  return (
    <section className="container pt-10 pb-8">
      <div className="card p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className={`${pacifico.className} text-4xl md:text-5xl text-brand`}>
            Big Lou&apos;s Bakery
          </h1>
          <p className="mt-3 text-lg opacity-80">
            Fresh-baked cookies, custom cakes, and delicious pies. Local pickup and nationwide shipping.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/shop" className="btn btn-brand">Shop now</a>
            <a href="/about" className="btn bg-white border border-black/10">Learn more</a>
          </div>
        </div>

        <div className="flex-1 relative w-full h-56 md:h-72 lg:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/chocolate-chunk-cookies.jpeg"
            alt="Fresh cookies from Big Lou's Bakery"
            fill
            className="object-cover object-center"
            priority
            sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}