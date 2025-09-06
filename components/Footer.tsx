export default function Footer() {
  console.log('🍪 FOOTER IS RENDERING!');
  return (
    <footer className="w-full bg-red-500 text-white border-t-8 border-yellow-400" style={{minHeight: '200px', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999}}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/15 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full"></div>
      </div>
      
      <div className="container py-12 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🍪 BIG LOU&apos;S BAKERY FOOTER 🍪</h2>
          <p className="text-xl">YOU SHOULD SEE THIS BRIGHT RED FOOTER NOW!</p>
          <div className="mt-4">
            <h3 className="font-bold">Contact: 123 Main St • Tue–Sat 8am–4pm</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-8 mt-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                BL
              </div>
              <h3 className="text-xl font-bold">Big Lou&apos;s Bakery</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Fresh-baked cookies, custom cakes, and delicious pies made with love and the finest ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="space-y-2">
              <a href="/shop" className="block text-white/80 hover:text-white transition-colors duration-200">Shop All Products</a>
              <a href="/about" className="block text-white/80 hover:text-white transition-colors duration-200">About Us</a>
              <a href="/faq" className="block text-white/80 hover:text-white transition-colors duration-200">FAQ</a>
              <a href="/" className="block text-white/80 hover:text-white transition-colors duration-200">Home</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tue–Sat 8am–4pm</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Main St, Hometown, USA</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@biglous.example</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70">© 2024 Big Lou&apos;s Bakery. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span>Cookies • Cakes • Pies</span>
            <span>•</span>
            <span>Made with ❤️ locally</span>
          </div>
        </div>
      </div>
    </footer>
  );
}