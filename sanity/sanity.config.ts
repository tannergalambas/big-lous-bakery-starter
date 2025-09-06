import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'big-lous-bakery',
  title: "Big Lou's Bakery CMS",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                S.documentTypeList('page')
                  .title('Pages')
              ),
            S.divider(),
            S.listItem()
              .title('FAQ Items')
              .child(
                S.documentTypeList('faqItem')
                  .title('FAQ Items')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})