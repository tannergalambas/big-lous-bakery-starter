import NavbarClient from './NavbarClient';
import { getNavigation, getSiteSettings, getAutoNavigation } from '@/lib/cms';

export default async function Navbar() {
  const [nav, settings, autoNav] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
    getAutoNavigation(),
  ]);

  const configured = (nav?.headerLinks || []).length ? nav : autoNav;
  const links = (configured?.headerLinks || []).map((l) => ({ href: l.url || '#', label: l.label || 'Link' }));
  const items = (configured as any)?.headerTree?.map((n: any) => ({
    href: n.url,
    label: n.label,
    children: (n.children || []).map((c: any) => ({ href: c.url, label: c.label })),
  }));
  // If CMS is not configured, fall back to NavbarClient defaults by passing undefined when empty
  const computedHeaderLinks = links && links.length ? links : undefined;
  return (
    <NavbarClient
      siteName={settings?.siteName || "Big Lou's Bakery"}
      items={items && items.length ? items : undefined}
      headerLinks={!items?.length ? computedHeaderLinks : undefined}
    />
  );
}
