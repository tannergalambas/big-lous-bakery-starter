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
  return <NavbarClient siteName={settings?.siteName || "Big Lou's Bakery"} headerLinks={links.length ? links : undefined} />;
}
