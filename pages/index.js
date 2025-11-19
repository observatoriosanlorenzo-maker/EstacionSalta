import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Home({ localidades }) {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Estación Salta — Datos en tiempo real</h1>
      <p>Selecciona una localidad para ver el estado actual y pronóstico</p>

      <ul>
        {localidades.map((loc) => (
          <li key={loc.id} style={{ margin: "10px 0" }}>
            <Link href={`/localidad/${loc.id}`}>
              {loc.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: localidades } = await supabase
    .from("localidades")
    .select("*")
    .order("id", { ascending: true });

  return {
    props: { localidades: localidades || [] }
  };
}
