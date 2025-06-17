import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Upload() {
  const [tool, setTool] = useState({ title: '', slug: '', description: '', how_to: '', version: '' });
  const [file, setFile] = useState<File|null>(null);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from('tool_files')
      .upload(`${tool.slug}/${file.name}`, file);
    if (uploadErr) return console.error(uploadErr);
    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tool_files/${uploadData.path}`;
    const { error } = await supabase.from('tools').insert([{ ...tool, file_url: fileUrl }]);
    if (error) console.error(error);
    else router.push('/');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload New Tool</h1>
      {['title','slug','description','how_to','version'].map(field => (
        <textarea
          key={field}
          placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
          value={(tool as any)[field]}
          onChange={e => setTool({ ...tool, [field]: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
      ))}
      <input type="file" onChange={e => setFile(e.target.files?.[0]||null)} className="mb-4" />
      <button onClick={handleUpload} className="w-full py-2 bg-green-600 text-white rounded">Upload</button>
    </div>
}