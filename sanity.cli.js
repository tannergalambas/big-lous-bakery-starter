const {defineCliConfig} = require('sanity/cli')

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bit7viby'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

module.exports = defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
