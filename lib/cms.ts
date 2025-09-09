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

// -------- Owner editables --------
export type SiteSettings = {
  siteName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  social?: { instagram?: string; tiktok?: string };
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string | null };
  featuredProductIds?: string[];
  footerText?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (sanityDisabled()) return null;
  try {
    const query = groq`*[_type == "siteSettings"][0]{
      siteName, tagline, email, phone, address, hours,
      social,
      seo{ metaTitle, metaDescription, "ogImage": ogImage.asset->url },
      featuredProductIds,
      footerText
    }`;
    const data = await sanity.fetch<SiteSettings | null>(query);
    return data ?? null;
  } catch {
    return null;
  }
}

export type Navigation = {
  headerLinks?: Array<{ label: string; url: string }>;
  footerLinks?: Array<{ label: string; url: string }>;
};

export async function getNavigation(): Promise<Navigation | null> {
  if (sanityDisabled()) return null;
  try {
    const query = groq`*[_type == "navigation"][0]{ headerLinks, footerLinks }`;
    const data = await sanity.fetch<Navigation | null>(query);
    return data ?? null;
  } catch {
    return null;
  }
}

export type Homepage = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string | null;
  ctas?: Array<{ label: string; href: string }>;
};

export async function getHomepage(): Promise<Homepage | null> {
  if (sanityDisabled()) return null;
  try {
    const query = groq`*[_type == "homepage"][0]{
      heroTitle,
      heroSubtitle,
      "heroImage": heroImage.asset->url,
      ctas
    }`;
    const data = await sanity.fetch<Homepage | null>(query);
    return data ?? null;
  } catch {
    return null;
  }
}
