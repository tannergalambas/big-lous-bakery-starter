export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Site Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'hours', title: 'Hours', type: 'text' },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
      ],
    },
    {
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'featuredProductIds',
      title: 'Featured Product IDs (Square)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Square item or variation IDs to feature on the homepage',
    },
    { name: 'footerText', title: 'Footer Text', type: 'text' },
  ],
}

