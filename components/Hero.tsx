'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-cream/90 to-accent/20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-60"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>

      {/* Main Content */}
      <div className="container relative z-10 text-center px-4">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-brand/10 shadow-lg mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-brand font-medium text-sm tracking-wide">FRESH BAKED DAILY</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="block gradient-text">Artisan Treats</span>
            <span className="block text-brand/80 font-body font-light italic text-4xl md:text-5xl lg:text-6xl mt-2">
              Made with Love
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
            Discover handcrafted pastries, cookies, and cakes made fresh daily in Austin, Texas. 
            <span className="block text-lg md:text-xl mt-2 text-brand/70 font-medium">
              Every bite tells a story of passion and tradition.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/shop" className="btn btn-brand text-xl px-8 py-4 shadow-2xl">
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Our Treats
              </span>
            </Link>
            
            <Link href="/about" className="group flex items-center gap-3 text-brand font-semibold text-lg hover:text-brand/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-full border-2 border-brand/20 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2 text-brand/60 animate-bounce">
          <span className="text-sm font-medium tracking-wider">SCROLL</span>
          <div className="w-0.5 h-8 bg-brand/30 rounded-full">
            <div className="w-full h-2 bg-brand rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}