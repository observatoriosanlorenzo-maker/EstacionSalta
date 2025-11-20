import { useState } from 'react';

export default function Observer() {
  const [form, setForm] = useState({});
  async function save() {
    const body = {...form, password: '12345'};
    const res = await fetch('/api/overrides/forecast', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    const j = await res.json();
    alert(j.error ? j.error : 'Guardado');
  }
  return (
    <div style={{padding:20}}>
      <h1>Panel Observador (San Lorenzo)</h1>
      <input placeholder="localidad_id (San Lorenzo)" onChange={e=>setForm({...form, localidad_id: e.target.value})} /><br/>
      <input placeholder="Temp" onChange={e=>setForm({...form, temp: Number(e.target.value)})} /><br/>
      <input placeholder="Ráfagas" onChange={e=>setForm({...form, wind_gust: Number(e.target.value)})} /><br/>
      <textarea placeholder="Descripción" onChange={e=>setForm({...form, description: e.target.value})}></textarea><br/>
      <button onClick={save}>Guardar manual (contra 12345)</button>
    </div>
  );
}
