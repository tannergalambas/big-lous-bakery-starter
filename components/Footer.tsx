export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-br from-brand/95 to-brand text-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/15 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full"></div>
      </div>
      
      <div className="container py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                BL
              </div>
              <h3 className="text-xl font-bold">Big Lou's Bakery</h3>
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
              <a href="/cart" className="block text-white/80 hover:text-white transition-colors duration-200">Shopping Cart</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tue–Sat 8am–4pm</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Main St, Hometown, USA</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@biglous.example</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70">© 2024 Big Lou's Bakery. All rights reserved.</p>
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
