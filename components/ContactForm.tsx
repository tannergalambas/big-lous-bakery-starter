'use client';

import { useState } from 'react';

type Props = {
  onSuccessMessage?: string;
  submitLabel?: string;
};

export default function ContactForm({ onSuccessMessage, submitLabel }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        orderType: '',
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold gradient-text mb-4" style={{ lineHeight: '1.2', paddingBottom: '0.25rem' }}>
          Thank you!
        </h2>
        <p className="text-gray-600 text-lg">
          {onSuccessMessage || "We've received your message and will get back to you soon."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors duration-200"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors duration-200"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors duration-200"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="orderType" className="block text-sm font-medium text-gray-700 mb-2">
            Inquiry Type
          </label>
          <select
            id="orderType"
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors duration-200"
          >
            <option value="">Select an option</option>
            <option value="general">General Question</option>
            <option value="custom-cake">Custom Cake Order</option>
            <option value="bulk-order">Bulk Order</option>
            <option value="catering">Catering Inquiry</option>
            <option value="pickup">Pickup Question</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors duration-200"
          placeholder="What can we help you with?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors duration-200 resize-vertical"
          placeholder="Tell us more about your request..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full btn btn-brand py-4 text-lg font-semibold ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl transform hover:-translate-y-0.5'
        } transition-all duration-200`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Sending...
          </span>
        ) : (
          submitLabel || 'Send Message'
        )}
      </button>
    </form>
  );
}
