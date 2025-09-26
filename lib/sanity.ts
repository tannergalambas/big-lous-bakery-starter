import { createClient } from '@sanity/client';

// Normalize .env values (strip quotes/whitespace) and validate
function normalize(v?: string | null) {
  if (!v) return '';
  const t = v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  return t;
}

// Prefer private SANITY_*; fall back to NEXT_PUBLIC_* if needed (helps Vercel misconfig)
const projectId = normalize(
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);
const dataset = normalize(
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET
);

const idOk = /^[a-z0-9-]+$/.test(projectId);
const dsOk = /^[a-z0-9-]+$/.test(dataset);
const token = normalize(process.env.SANITY_API_READ_TOKEN);

export const isSanityEnabled = Boolean(projectId && dataset && idOk && dsOk);

function stubClient() {
  const err = new Error(
    'Sanity disabled or misconfigured. Check SANITY_PROJECT_ID and SANITY_DATASET.'
  );
  return {
    // Minimal surface used by this app
    fetch: async () => {
      throw err;
    },
  } as unknown as ReturnType<typeof createClient>;
}

export function sanityFor(preview = false) {
  if (!isSanityEnabled) return stubClient();
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-07-01',
    useCdn: !preview,
    token: preview && token ? token : undefined,
    perspective: preview && token ? 'previewDrafts' : 'published',
  });
}

export const sanity = sanityFor(false);
