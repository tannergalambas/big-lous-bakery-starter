"use client";
import {PortableText, PortableTextComponents} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    normal: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 space-y-1 mb-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 space-y-1 mb-4">{children}</ol>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({value, children}) => (
      <a href={(value as any)?.href} className="underline text-brand hover:opacity-80">{children}</a>
    ),
  },
};

export default function RichText({value}: {value: any}) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}

