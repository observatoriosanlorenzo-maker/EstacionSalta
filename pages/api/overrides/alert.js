import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { password } = req.body;
  if (password !== '12345') return res.status(401).json({ error: 'Unauthorized' });

  const { area, color, title, details } = req.body;
  if (!area || !color) return res.status(400).json({ error: 'Faltan campos' });

  try {
    const { error } = await supabase.from('alerts').insert([{
      area, color, title: title||'', details: details||'', created_at: new Date().toISOString()
    }]);
    if (error) throw error;
    return res.status(200).json({ status: 'ok' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
