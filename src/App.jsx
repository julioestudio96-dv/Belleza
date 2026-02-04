import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {supabase} from './supabaseClients.js'
import './App.css'
import { Link } from 'react-router-dom'


function App() {

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
    servicio: "",
  })

  const horas = ['09:00', '09:30', '10:00', '14:00', '14:30', '17:00', '18:00']

  const servicios = ['Maquillaje', 'Estilista', 'Cuidado de Piela piel']

  // Actuliza los datos del formulario (guarda en el estado los datos que el usuario escribe)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Envía los datos del formulario a la base de datos (async porque es una operación que puede tardar, esperear una respuesta)
  const handleSubmit = async (e) => {
    e.preventDefault();   // Evita que la página se recargue al enviar el formulario

    const {data, error} = await supabase
      .from('Citas')
      .insert([{
        nombre: form.nombre,
        telefono: form.telefono,
        fecha: form.fecha,
        hora: form.hora,
        servicio: form.servicio,
      }])

    if (error) {
      console.log("Error al agendar la cita:" + error);   // Manejo del error de inserción
    } else {
      alert("Cita agendada con éxito:" + data);    // Confirmación de inserción exitosa *(Alert=pop-up ventana que avisa)*
    }
  }

  return (
    <main className="min-h-screen bg-[#d6cdc5] flex justify-center items-center font-mono p-4">
      <section className="w-full max-w-90 border border-gray-500 rounded-sm p-8 shadow-sm">
        
        <header className="mb-6">
          <h1 className="text-2xl text-gray-800 font-bold uppercase">Escoje tu cita:</h1>
          <hr className="border-none h-px bg-gray-500 mt-1" />
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <fieldset className="flex flex-col border-none p-0 m-0">
            <label htmlFor="nombre" className="text-xs text-gray-700 uppercase mb-1">Nombre:</label>
            <input type="text" name="nombre" id="nombre" value={form.nombre} onChange={handleChange} required
              className="border border-gray-600 bg-transparent rounded-sm p-2 focus:outline-none" />
          </fieldset>

          <fieldset className="flex flex-col border-none p-0 m-0">
            <label htmlFor="telefono" className="text-xs text-gray-700 uppercase mb-1">Teléfono:</label>
            <input type="text" name="telefono" id="telefono" value={form.telefono} onChange={handleChange} required
              className="border border-gray-600 bg-transparent rounded-sm p-2 focus:outline-none" />
          </fieldset>

          <fieldset className="flex flex-col border-none p-0 m-0">
            <label htmlFor="fecha" className="text-xs text-gray-700 uppercase mb-1">Fecha:</label>
            <input type="date" name="fecha" id="fecha" value={form.fecha} onChange={handleChange} required
              className="border border-gray-600 bg-transparent rounded-sm p-2 focus:outline-none" />
          </fieldset>

          <fieldset className="flex flex-col border-none p-0 m-0">
            <label htmlFor="hora" className="text-xs text-gray-700 uppercase mb-1">Hora:</label>
            <select name="hora" id="hora" value={form.hora} onChange={handleChange} required
              className="border border-gray-600 bg-transparent rounded-sm p-2">
              <option value="">Seleccionar</option>
              {horas.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </fieldset>

          <fieldset className="flex flex-col border-none p-0 m-0">
            <label htmlFor="servicio" className="text-xs text-gray-700 uppercase mb-1">Servicio:</label>
            <select name="servicio" id="servicio" value={form.servicio} onChange={handleChange} required
              className="border border-gray-600 bg-transparent rounded-sm p-2">
              <option value="">Seleccionar</option>
              {servicios.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </fieldset>

          <footer className="mt-6 flex flex-col gap-2">
            <button type="submit" className="bg-black text-white py-3 rounded-sm font-bold uppercase text-[10px] tracking-widest cursor-pointer hover:bg-zinc-800">
              Agendar Cita
            </button>
            <Link to="/registros" className="bg-zinc-800 text-white py-2 rounded-sm font-bold uppercase text-[10px] tracking-widest text-center block">
              Ver Citas
            </Link>
          </footer>

        </form>
      </section>
    </main>
  )
}
export default App