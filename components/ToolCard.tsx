import Link from 'next/link';
interface Props { slug: string; title: string; description: string; }
export default function ToolCard({ slug, title, description }: Props) {
  return (
    <Link href={`/tool/${slug}`}>
      <a className="block border p-4 rounded hover:shadow-lg transition">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description.substring(0, 100)}...</p>
      </a>
    </Link>
  );
}