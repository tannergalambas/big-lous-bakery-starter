import { getNavigation } from './cms';

export type NavItem = {
  label: string;
  url: string;
  icon?: string;
};

// Default fallback navigation that matches current navbar
const DEFAULT_NAVIGATION: NavItem[] = [
  { 
    label: 'Shop', 
    url: '/shop', 
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' 
  },
  { 
    label: 'About', 
    url: '/about', 
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    label: 'Contact', 
    url: '/contact', 
    icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
  },
  { 
    label: 'FAQ', 
    url: '/faq', 
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  }
];

// Map common page names to icons
const ICON_MAP: Record<string, string> = {
  'shop': 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  'about': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'contact': 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'faq': 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'products': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
  'menu': 'M4 6h16M4 12h16M4 18h16',
  'home': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
};

function getIconForNavItem(label: string, url: string): string {
  // Try to match by URL path
  const urlPath = url.replace('/', '').toLowerCase();
  if (ICON_MAP[urlPath]) {
    return ICON_MAP[urlPath];
  }
  
  // Try to match by label
  const labelKey = label.toLowerCase();
  if (ICON_MAP[labelKey]) {
    return ICON_MAP[labelKey];
  }
  
  // Default icon for unknown items
  return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
}

export async function getHeaderNavigation(preview = false): Promise<NavItem[]> {
  try {
    const navigation = await getNavigation(preview);
    
    if (navigation?.headerLinks && navigation.headerLinks.length > 0) {
      // Use CMS navigation and add appropriate icons
      return navigation.headerLinks.map(link => ({
        label: link.label,
        url: link.url,
        icon: getIconForNavItem(link.label, link.url)
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch navigation from CMS, using fallback:', error);
  }
  
  // Fallback to default navigation
  return DEFAULT_NAVIGATION;
}
