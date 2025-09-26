import NavbarClient from './NavbarClient';
import { getHeaderNavigation } from '@/lib/navigation';
import { getSiteSettings } from '@/lib/cms';
import { draftMode } from 'next/headers';

export default async function Navbar() {
  const preview = draftMode().isEnabled;
  const [navigationItems, siteSettings] = await Promise.all([
    getHeaderNavigation(preview),
    getSiteSettings(preview)
  ]);

  const siteName = siteSettings?.siteName || "Big Lou's Bakery";

  return <NavbarClient navigationItems={navigationItems} siteName={siteName} />;
}
