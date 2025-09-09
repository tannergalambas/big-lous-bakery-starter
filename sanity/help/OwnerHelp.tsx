import React from 'react'

export default function OwnerHelp() {
  return (
    <div style={{ padding: 24, lineHeight: 1.5, maxWidth: 760 }}>
      <h1 style={{ margin: '0 0 8px' }}>Owner Guide</h1>
      <p>Edit your site safely using these sections in the left sidebar.</p>

      <ol>
        <li><strong>Homepage</strong>: Change hero title, subtitle, image, and buttons.</li>
        <li><strong>Navigation</strong>: Control header and footer links.</li>
        <li><strong>Site Settings</strong>: Name, contact, hours, social, SEO defaults, featured products.</li>
        <li><strong>Pages</strong>: Create content pages (About, Contact, etc.). Use the <em>Parent Page</em> field for hierarchy.</li>
        <li><strong>FAQ Items</strong>: Add common questions. Use the <em>Order</em> field for sorting.</li>
      </ol>

      <h3>Preview changes</h3>
      <p>
        Use the <em>Preview</em> tab on Homepage and Pages to open your website in preview mode
        (shows drafts). When done, click <em>Disable Preview</em> in that tab.
      </p>

      <h3>Troubleshooting</h3>
      <ul>
        <li>If images don’t show, save/publish again and refresh the site.</li>
        <li>Check site health at <code>/api/sanityhealth</code>.</li>
        <li>Products not loading? Check <code>/api/squarehealth</code>.</li>
      </ul>

      <p style={{ marginTop: 16 }}>
        Developer notes are in <code>OWNER_GUIDE.md</code> in the repo.
      </p>
    </div>
  )
}

