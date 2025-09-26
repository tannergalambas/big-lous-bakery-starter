import NavbarClient from './NavbarClient';
import { getHeaderNavigation } from '@/lib/navigation';
import { getSiteSettings } from '@/lib/cms';

export default async function Navbar() {
  const [navigationItems, siteSettings] = await Promise.all([
    getHeaderNavigation(),
    getSiteSettings()
  ]);

  const siteName = siteSettings?.siteName || "Big Lou's Bakery";

  return <NavbarClient navigationItems={navigationItems} siteName={siteName} />;
}