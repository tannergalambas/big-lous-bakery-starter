import Link from 'next/link';

export default function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; url: string }>;
}) {
  if (!items || items.length <= 1) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-brand">Home</Link>
        </li>
        {items.map((i, idx) => (
          <li key={i.url} className="flex items-center gap-2">
            <span>/</span>
            {idx < items.length - 1 ? (
              <Link href={i.url} className="hover:text-brand">{i.label}</Link>
            ) : (
              <span className="text-gray-800">{i.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}