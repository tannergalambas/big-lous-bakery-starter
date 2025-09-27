'use client';

import { useMemo, useState } from 'react';

type Props = {
  title?: string;
  description?: string;
  highlights?: string[];
  buttonLabel?: string;
  successTitle?: string;
  successDescription?: string;
};

export default function NewsletterSignup({
  title,
  description,
  highlights,
  buttonLabel,
  successTitle,
  successDescription,
}: Props) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const highlightItems = useMemo(
    () =>
      highlights && highlights.length
        ? highlights
        : ['Weekly specials', 'Recipe tips', 'Exclusive discounts'],
    [highlights],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate newsletter signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-br from-brand/5 to-green-50/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-3">
              {successTitle || 'Welcome to our family! 🎉'}
            </h3>
            <p className="text-gray-600 text-lg">
              {successDescription || "You're now subscribed to receive our freshest updates, special offers, and behind-the-scenes content."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-brand/5 to-green-50/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-white/95 to-green-50/50 border border-brand/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content Side */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
                  {title || 'Stay Sweet with Us!'}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {description ||
                    'Be the first to know about our seasonal specials, new treats, and exclusive offers. Plus, get behind-the-scenes content from our kitchen!'}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 mb-6">
                  {highlightItems.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Side */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 text-lg border rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                        error ? 'border-red-300 focus:ring-red/20 focus:border-red-500' : 'border-gray-200'
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200 ${
                      isSubmitting || !email
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'btn btn-brand hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {buttonLabel || 'Subscribe for Sweet Updates'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
