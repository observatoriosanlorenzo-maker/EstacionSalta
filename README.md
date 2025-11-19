# Estacionsalta — Proyecto

Estructura y pasos rápidos:

1. Crear proyecto en Supabase y ejecutar `supabase/supabase_schema.sql` (crea tablas y seed localidades).
2. Subir este repo a GitHub (carpeta raíz `estacionsalta`).
3. Conectar repo a Vercel y añadir variables de entorno: SUPABASE_URL, SUPABASE_ANON_KEY, OPENWEATHER_API_KEY, NEXT_PUBLIC_WINDY_EMBED_URL.
4. Deploy en Vercel. Acceder a:
   - `/` (home)
   - `/mapa`
   - `/localidad/[id]`
   - `/panel-alertas`
   - `/observer` (login simple: user Santi / pass 12345)

Notas:
- San Lorenzo es la estación observador. Manuales validan 1 hora.
- Si no hay manual en San Lorenzo, se usa OpenWeather como respaldo.
