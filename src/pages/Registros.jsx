import React from "react";
import { supabase } from "../supabaseClients.js"; // Verifica que esta ruta sea correcta
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Registros() {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
        const { data, error } = await supabase.from("Citas").select("*");

        if (error) {
            console.log("Error al obtener las citas: " + error);
        } else {
            setCitas(data);
        }
        };
        fetchCitas();
}, []);

return (
        <main className="min-h-screen bg-[#d6cdc5] flex justify-center items-start font-mono p-4 md:p-10">
        <article className="w-full max-w-4xl border border-gray-500 rounded-sm p-6 md:p-10">
            <nav className="mb-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 text-[10px] uppercase tracking-widest font-bold">
                ← Regresar
            </Link>
            </nav>

            <header className="mb-6">
            <h1 className="text-2xl text-gray-800 font-bold uppercase">
                Citas Registradas
            </h1>
            <hr className="h-px bg-gray-500 border-none mt-1" />
            </header>

            <section className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b border-gray-400 text-gray-600 uppercase text-[10px] tracking-widest">
                    <th className="py-4 px-2">Cliente</th>
                    <th className="py-4 px-2">Contacto</th>
                    <th className="py-4 px-2">Fecha</th>
                    <th className="py-4 px-2">Hora</th>
                    <th className="py-4 px-2 border-l border-gray-400 pl-4"> Servicio </th>
                </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                {citas.map((cita) => (
                    <tr
                    key={cita.id}
                    className="border-b border-gray-300 hover:bg-white/10"
                    >
                    <td className="py-4 px-2 italic">{cita.nombre}</td>
                    <td className="py-4 px-2">{cita.telefono}</td>
                    <td className="py-4 px-2">{cita.fecha}</td>
                    <td className="py-4 px-2">{cita.hora}</td>
                    <td className="py-4 px-2 border-l border-gray-400 pl-4 font-black uppercase text-[10px]">
                        {cita.servicio}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </section>
        </article>
        </main>
    );
}

export default Registros;
