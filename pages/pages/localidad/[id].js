import { supabase } from "../../lib/supabase";
import Link from "next/link";
import WindyEmbed from "../../components/WindyEmbed";

export default function Localidad({ localidad }) {
  if (!localidad) return <p>No encontrada</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Link href="/">← Volver</Link>
      <h1>{localidad.nombre}</h1>

      <p><b>Departamento:</b> {localidad.departamento}</p>
      <p><b>Ubicación:</b> {localidad.lat}, {localidad.lon}</p>

      <h2>Mapa del tiempo</h2>
      <WindyEmbed lat={localidad.lat} lon={localidad.lon} zoom={9} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = Number(params.id);
  const { data: localidades } = await supabase
    .from("localidades")
    .select("*")
    .eq("id", id)
    .limit(1);

  return {
    props: { localidad: localidades ? localidades[0] : null }
  };
}
