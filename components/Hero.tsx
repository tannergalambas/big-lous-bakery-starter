'use client';

import Image from 'next/image';
import { pacifico } from '../lib/fonts';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="container pt-10 pb-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle absolute top-20 left-10 w-4 h-4 bg-brand/20 rounded-full"></div>
        <div className="floating-particle absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full" style={{animationDelay: '2s'}}></div>
        <div className="floating-particle absolute bottom-32 left-1/4 w-3 h-3 bg-brand/30 rounded-full" style={{animationDelay: '4s'}}></div>
        <div className="floating-particle absolute top-60 right-1/3 w-5 h-5 bg-accent/15 rounded-full" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-gradient-to-br from-white via-cream/30 to-accent/20 border-0 shadow-xl relative group transition-all duration-1000 ${isLoaded ? 'hero-loaded' : 'hero-loading'}`}>
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="overflow-hidden">
            <h1 className={`${pacifico.className} text-4xl md:text-5xl lg:text-6xl text-brand mb-4 drop-shadow-sm hero-title`}>
              Big Lou&apos;s Bakery
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-lg hero-subtitle">
              Fresh-baked cookies, custom cakes, and delicious pies. Local pickup and nationwide shipping.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start hero-buttons">
            <a href="/shop" className="btn btn-brand shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand/80 to-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
            <a href="/about" className="btn bg-white/80 backdrop-blur-sm border border-brand/20 hover:bg-white hover:border-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn more
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-brand/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
            </a>
          </div>
        </div>

        <div className="flex-1 relative w-full h-64 md:h-80 lg:h-96 hero-image">
          {/* Multiple layered effects */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/20 z-10 transition-all duration-500 group-hover:from-black/10 group-hover:to-black/30"></div>
            
            {/* Dynamic glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand/10 via-transparent to-transparent z-20 opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            
            {/* Animated border pulse */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-brand/20 group-hover:ring-brand/40 transition-all duration-500 animate-pulse-ring"></div>
            
            <Image
              src="/chocolate-chunk-cookies.jpeg"
              alt="Fresh cookies from Big Lou's Bakery"
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              priority
              sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 90vw"
            />
            
            {/* Floating badges */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-brand shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Fresh Daily 🍪
            </div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}