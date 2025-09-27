export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'navLabel',
      title: 'Navigation label',
      type: 'string',
      description: 'Optional label shown in navigation instead of the title.',
    },
    {
      name: 'order',
      title: 'Navigation order',
      type: 'number',
      description: 'Lower numbers appear first when auto-generating navigation.',
    },
    {
      name: 'hideFromNav',
      title: 'Hide from navigation',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'image',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        },
      ],
    },
    {
      name: 'ctaTitle',
      title: 'Call-to-action heading',
      type: 'string',
      description: 'Heading shown above the call-to-action buttons on the page.',
    },
    {
      name: 'ctaDescription',
      title: 'Call-to-action description',
      type: 'text',
      rows: 3,
      description: 'Short paragraph that appears above the call-to-action buttons.',
    },
    {
      name: 'ctas',
      title: 'Call-to-action buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'image',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : undefined,
        media,
      }
    },
  },
}
