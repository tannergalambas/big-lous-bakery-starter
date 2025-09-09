export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Hero Title', type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    {
      name: 'ctas',
      title: 'Hero Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
            {
              name: 'style',
              title: 'Style',
              type: 'string',
              options: { list: [
                { title: 'Primary', value: 'primary' },
                { title: 'Secondary', value: 'secondary' }
              ], layout: 'radio' },
              initialValue: 'primary'
            }
          ],
        },
      ],
      description: 'Up to two buttons are shown. First is styled as Primary by default.'
    },
  ],
}
