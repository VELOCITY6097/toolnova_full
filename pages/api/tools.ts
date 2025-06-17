import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('tools').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }
  res.status(405).end();
}