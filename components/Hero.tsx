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

        <div className="flex-1 relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
          {/* Background gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/20 z-10"></div>
          
          {/* Subtle inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand/10 via-transparent to-transparent z-20"></div>
          
          <Image
            src="/chocolate-chunk-cookies.jpeg"
            alt="Fresh cookies from Big Lou's Bakery"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
            sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 90vw"
          />
          
          {/* Elegant border highlight */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 ring-inset z-30"></div>
        </div>
      </div>
    </section>
  );
}