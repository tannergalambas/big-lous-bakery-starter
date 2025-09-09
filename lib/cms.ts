import { sanity } from './sanity';
import groq from 'groq';

type Maybe<T> = T | null | undefined;

function sanityDisabled() {
  const projectId =
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset =
    process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
  return !projectId || !dataset;
}

export type CmsPage = {
  title: string;
  content?: string;
  image?: string | null;
};

export async function getPage(slug: string): Promise<Maybe<CmsPage>> {
  if (sanityDisabled()) return null;

  try {
    const query = groq`*[_type == "page" && slug.current == $slug][0]{
      title,
      content,
      "image": image.asset->url
    }`;

    const data = await sanity.fetch<CmsPage | null>(query, { slug });
    return data ?? null;
  } catch {
    return null;
  }
}

export type FaqItem = { question: string; answer: string };

export async function getFaq(): Promise<FaqItem[]> {
  if (sanityDisabled()) return [];

  try {
    const query = groq`*[_type == "faqItem"] | order(order asc){
      question,
      answer
    }`;
    const data = await sanity.fetch<FaqItem[]>(query);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
