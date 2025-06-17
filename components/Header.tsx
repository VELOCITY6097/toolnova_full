import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/"><a className="text-2xl font-bold">ToolNova</a></Link>
      <nav>
        <Link href="/admin"><a className="mr-4">Admin</a></Link>
        <Link href="/upload"><a>Upload</a></Link>
      </nav>
    </header>
  );
}