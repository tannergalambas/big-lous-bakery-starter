import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'big-lous-bakery',
  title: "Big Lou's Bakery CMS",
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    '',
  dataset:
    process.env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    'production',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Homepage').child(
              S.editor().schemaType('homepage').documentId('homepage')
            ),
            S.listItem().title('Navigation').child(
              S.editor().schemaType('navigation').documentId('navigation')
            ),
            S.listItem().title('Site Settings').child(
              S.editor().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.listItem().title('Pages').child(S.documentTypeList('page').title('Pages')),
            S.listItem()
              .title('FAQ Items')
              .child(
                S.documentTypeList('faqItem')
                  .title('FAQ Items')
                  .defaultOrdering([{field: 'order', direction: 'asc'}])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
