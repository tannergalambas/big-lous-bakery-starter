export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this FAQ item should appear'
    },
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'order'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `Order: ${subtitle}` : 'No order set'
      }
    }
  }
}