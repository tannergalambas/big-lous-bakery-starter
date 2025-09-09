import React, {useMemo, useState} from 'react'
import type { SanityDocument } from 'sanity'

type Props = { document: { displayed: SanityDocument } }

export default function PreviewPane(props: Props) {
  const doc = props.document.displayed as any
  const [siteUrl, setSiteUrl] = useState<string>(
    (typeof window !== 'undefined' && localStorage.getItem('preview_site_url')) ||
      (process.env.NEXT_PUBLIC_BASE_URL as string) ||
      'http://localhost:3000'
  )
  const [secret, setSecret] = useState<string>(
    (typeof window !== 'undefined' && localStorage.getItem('preview_secret')) ||
      (process.env.SANITY_PREVIEW_SECRET as string) ||
      ''
  )

  const path = useMemo(() => {
    if (doc?._type === 'homepage') return '/'
    if (doc?._type === 'page') return `/${doc?.slug?.current || ''}`
    return '/'
  }, [doc])

  const enableUrl = `${siteUrl.replace(/\/$/, '')}/api/preview?secret=${encodeURIComponent(
    secret || ''
  )}&redirect=${encodeURIComponent(path)}`
  const disableUrl = `${siteUrl.replace(/\/$/, '')}/api/preview/disable?redirect=${encodeURIComponent(
    path
  )}`

  function persist() {
    if (typeof window === 'undefined') return
    localStorage.setItem('preview_site_url', siteUrl)
    localStorage.setItem('preview_secret', secret)
  }

  return (
    <div style={{padding: 16}}>
      <div style={{display: 'grid', gap: 8, maxWidth: 560}}>
        <label>
          <div style={{fontSize: 12, opacity: 0.7}}>Site URL</div>
          <input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} onBlur={persist}
                 placeholder="https://bakery.tannergalambas.com"
                 style={{width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 8}} />
        </label>
        <label>
          <div style={{fontSize: 12, opacity: 0.7}}>Preview Secret</div>
          <input value={secret} onChange={(e) => setSecret(e.target.value)} onBlur={persist}
                 placeholder="set SANITY_PREVIEW_SECRET"
                 style={{width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 8}} />
        </label>
        <div style={{display: 'flex', gap: 8}}>
          <a href={enableUrl} target="_blank" rel="noreferrer" style={{
            background: '#0ea5a0', color: 'white', padding: '8px 12px', borderRadius: 8, textDecoration: 'none'
          }}>Open Preview</a>
          <a href={disableUrl} target="_blank" rel="noreferrer" style={{
            background: '#e5e7eb', color: '#111827', padding: '8px 12px', borderRadius: 8, textDecoration: 'none'
          }}>Disable Preview</a>
        </div>
        <div style={{fontSize: 12, opacity: 0.7}}>Path: {path}</div>
      </div>
    </div>
  )
}

