import { PortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.url;
      if (!url) return null;
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value?.alt || ''} className="w-full rounded-2xl shadow-lg" />
          {value?.alt ? (
            <figcaption className="mt-2 text-sm text-gray-500">{value.alt}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed text-lg mb-6 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand pl-4 italic text-gray-600 mb-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-brand hover:underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
  },
};

export default function RichText({ value }: { value?: any[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
