import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ToolCard from '../components/ToolCard';

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  useEffect(() => {
    supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setTools(data || []));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ToolNova Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <ToolCard key={tool.id} slug={tool.slug} title={tool.title} description={tool.description} />
        ))}
      </div>
    </div>
  );
}