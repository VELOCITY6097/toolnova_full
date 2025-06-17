import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ToolDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [tool, setTool] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      supabase
        .from('tools')
        .select('*')
        .eq('slug', slug)
        .single()
        .then(({ data }) => {
          setTool(data);
          supabase.from('tools').update({ views: (data.views || 0) + 1 }).eq('id', data.id).then();
        });
    }
  }, [slug]);

  if (!tool) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{tool.title}</h1>
      <p className="mt-2 text-gray-700">{tool.description}</p>
      <h2 className="mt-6 text-2xl font-semibold">How to Use</h2>
      <p className="mt-2 whitespace-pre-line">{tool.how_to}</p>
      <a
        href={tool.file_url}
        onClick={() => supabase.from('tools').update({ downloads: (tool.downloads||0)+1 }).eq('id', tool.id).then()}
        className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded"
        download
      >
        Download v{tool.version}
      </a>
      <p className="mt-2 text-sm text-gray-500">
        Views: {tool.views || 0} • Downloads: {tool.downloads || 0}
      </p>
      <div className="mt-10">
        <giscus-widget
          repo="YOUR_GITHUB_USERNAME/toolnova"
          repo-id=""
          category="General"
          category-id=""
          mapping="pathname"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          theme="light"
          lang="en"
        />
      </div>
    </div>
  );
}