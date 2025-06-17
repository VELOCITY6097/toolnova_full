import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Logged in! Redirecting...');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
      <button onClick={signIn} className="w-full py-2 bg-blue-600 text-white rounded">Sign In</button>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
}