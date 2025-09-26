'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-cream/90 to-accent/20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2312332e" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-brand/10 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Main Content */}
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-brand/10 shadow-lg mb-8"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-brand font-medium text-sm tracking-wide">FRESH BAKED DAILY</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
          >
            <span className="block gradient-text">Artisan Treats</span>
            <span className="block text-brand/80 font-body font-light italic text-5xl md:text-6xl lg:text-7xl mt-2">
              Made with Love
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto mb-12 font-body leading-relaxed"
          >
            Discover handcrafted pastries, cookies, and cakes made fresh daily in Austin, Texas. 
            <span className="block text-lg md:text-xl mt-2 text-brand/70 font-medium">
              Every bite tells a story of passion and tradition.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/shop" className="btn btn-brand text-xl px-8 py-4 shadow-2xl">
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Our Treats
              </span>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-brand font-semibold text-lg hover:text-brand/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full border-2 border-brand/20 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              Our Story
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-brand/60"
        >
          <span className="text-sm font-medium tracking-wider">SCROLL</span>
          <div className="w-0.5 h-8 bg-brand/30 rounded-full">
            <motion.div
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full bg-brand rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}