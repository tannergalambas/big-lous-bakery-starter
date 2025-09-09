import NavbarClient from './NavbarClient';
import { getNavigation, getSiteSettings } from '@/lib/cms';

export default async function Navbar() {
  const [nav, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
  ]);

  const links = (nav?.headerLinks || []).map((l) => ({ href: l.url || '#', label: l.label || 'Link' }));
  return <NavbarClient siteName={settings?.siteName || "Big Lou's Bakery"} headerLinks={links.length ? links : undefined} />;
}
