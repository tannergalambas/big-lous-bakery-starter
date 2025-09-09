export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'parent',
      title: 'Parent Page (optional)',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Select a parent page to build a hierarchy and breadcrumbs.'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls ordering when shown in navigation.'
    },
    {
      name: 'navLabel',
      title: 'Navigation Label',
      type: 'string',
      description: 'Optional label to use in menus instead of the title.'
    },
    {
      name: 'hideFromNav',
      title: 'Hide From Navigation',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      parent: 'parent.title'
    }
  }
}
