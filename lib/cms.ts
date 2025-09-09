import { sanity, sanityFor } from './sanity';
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
  content?: any;
  image?: string | null;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string | null };
};

export async function getPage(slug: string, preview = false): Promise<Maybe<CmsPage>> {
  if (sanityDisabled()) return null;

  try {
    const query = groq`*[_type == "page" && slug.current == $slug][0]{
      title,
      content[]{
        ...,
        _type == 'image' => {
          ...,
          'url': asset->url,
          'alt': coalesce(alt, '')
        }
      },
      "image": image.asset->url,
      seo{ metaTitle, metaDescription, "ogImage": ogImage.asset->url },
    }`;

    const client = preview ? sanityFor(true) : sanity;
    const data = await client.fetch<CmsPage | null>(query, { slug });
    return data ?? null;
  } catch {
    return null;
  }
}

export type FaqItem = { question: string; answer: string };

export async function getFaq(preview = false): Promise<FaqItem[]> {
  if (sanityDisabled()) return [];

  try {
    const query = groq`*[_type == "faqItem"] | order(order asc){
      question,
      answer
    }`;
    const client = preview ? sanityFor(true) : sanity;
    const data = await client.fetch<FaqItem[]>(query);
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

export async function getSiteSettings(preview = false): Promise<SiteSettings | null> {
  if (sanityDisabled()) return null;
  try {
    const query = groq`*[_type == "siteSettings"][0]{
      siteName, tagline, email, phone, address, hours,
      social,
      seo{ metaTitle, metaDescription, "ogImage": ogImage.asset->url },
      featuredProductIds,
      footerText
    }`;
    const client = preview ? sanityFor(true) : sanity;
    const data = await client.fetch<SiteSettings | null>(query);
    return data ?? null;
  } catch {
    return null;
  }
}

export type Navigation = {
  headerLinks?: Array<{ label: string; url: string }>;
  footerLinks?: Array<{ label: string; url: string }>;
};

export async function getNavigation(preview = false): Promise<Navigation | null> {
  if (sanityDisabled()) return null;
  try {
    const query = groq`*[_type == "navigation"][0]{ headerLinks, footerLinks }`;
    const client = preview ? sanityFor(true) : sanity;
    const data = await client.fetch<Navigation | null>(query);
    return data ?? null;
  } catch {
    return null;
  }
}

// Auto-nav fallback from Pages
export type PageForNav = {
  title: string;
  slug: string;
  navLabel?: string;
  order?: number;
  hideFromNav?: boolean;
  parent?: { slug: string; title: string } | null;
};

export async function getAutoNavigation(preview = false): Promise<Navigation> {
  if (sanityDisabled()) return { headerLinks: [], footerLinks: [] };
  try {
    const query = groq`*[_type=='page']{ 
      title,
      "slug": slug.current,
      navLabel, order, hideFromNav,
      parent->{ "slug": slug.current, title }
    }`;
    const client = preview ? sanityFor(true) : sanity;
    const pages = await client.fetch<PageForNav[]>(query);
    const topLevel = (pages || [])
      .filter((p) => !p.parent && !p.hideFromNav && p.slug)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    const links = topLevel.map((p) => ({ label: p.navLabel || p.title, url: `/${p.slug}` }));
    return { headerLinks: links, footerLinks: links };
  } catch {
    return { headerLinks: [], footerLinks: [] };
  }
}

export type Homepage = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string | null;
  ctas?: Array<{ label: string; href: string }>;
};

export async function getHomepage(preview = false): Promise<Homepage | null> {
  if (sanityDisabled()) return null;
  try {
    const query = groq`*[_type == "homepage"][0]{
      heroTitle,
      heroSubtitle,
      "heroImage": heroImage.asset->url,
      ctas
    }`;
    const client = preview ? sanityFor(true) : sanity;
    const data = await client.fetch<Homepage | null>(query);
    return data ?? null;
  } catch {
    return null;
  }
}
