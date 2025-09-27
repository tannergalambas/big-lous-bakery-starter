export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Contact email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    },
    {
      name: 'hours',
      title: 'Hours',
      type: 'text',
      rows: 3,
    },
    {
      name: 'social',
      title: 'Social links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
      ],
    },
    {
      name: 'contactFormSubmitLabel',
      title: 'Contact form button label',
      type: 'string',
    },
    {
      name: 'featuredProductIds',
      title: 'Featured product IDs',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'footerText',
      title: 'Footer text',
      type: 'text',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta title', type: 'string' },
        { name: 'metaDescription', title: 'Meta description', type: 'text' },
        {
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
}
