import { getFaq } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const cmsFaq = await getFaq();
  const faq = cmsFaq.length
    ? cmsFaq
    : [
        {
          question: 'Do you offer local pickup?',
          answer:
            'Yes! Choose local pickup during Square checkout when available. You can also leave a pickup note on the product page.',
        },
        {
          question: 'Do you ship nationwide?',
          answer:
            'We ship select items (like cookies) to most U.S. states. Shipping rates and options appear during checkout.',
        },
        {
          question: 'Do you make custom cakes?',
          answer:
            'Absolutely. Send us a message with your theme, size, and date. We’ll confirm availability and a quote.',
        },
      ];

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>
      <div className="space-y-6">
        {faq.map((f, i) => (
          <div key={i} className="bg-white rounded-xl border p-4">
            <div className="font-semibold">{f.question}</div>
            <p className="opacity-80 mt-1">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

