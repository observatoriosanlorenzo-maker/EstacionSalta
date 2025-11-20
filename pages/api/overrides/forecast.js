import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  // simple auth: check password in body (Santi / 12345)
  const { password } = req.body;
  if (password !== '12345') return res.status(401).json({ error: 'Unauthorized' });

  const { localidad_id, temp, precip, wind_speed, wind_gust, description, author } = req.body;
  if (!localidad_id) return res.status(400).json({ error: 'Falta localidad_id' });

  try {
    const { error } = await supabase.from('forecasts').insert([{
      locality: String(localidad_id),
      description: description || '',
      temp_min: temp ?? null,
      temp_max: temp ?? null,
      created_at: new Date().toISOString()
    }]);
    if (error) throw error;
    return res.status(200).json({ status: 'ok' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
