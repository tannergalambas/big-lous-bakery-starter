"use client";
import {PortableText, PortableTextComponents} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-brand/40 pl-4 italic text-gray-700 my-4">{children}</blockquote>
    ),
    normal: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 space-y-1 mb-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 space-y-1 mb-4">{children}</ol>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({value, children}) => {
      const href = (value as any)?.href;
      const external = href && /^https?:\/\//.test(href);
      return (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="underline text-brand hover:opacity-80">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({value}) => (
      <figure className="my-6">
        {/* value.url is projected in GROQ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={(value as any)?.url} alt={(value as any)?.alt || ''} className="rounded-xl shadow-md" />
        {(value as any)?.alt ? (
          <figcaption className="text-sm text-gray-500 mt-2">{(value as any).alt}</figcaption>
        ) : null}
      </figure>
    ),
  },
};

export default function RichText({value}: {value: any}) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
