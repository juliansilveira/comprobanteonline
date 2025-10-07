import React, { useState } from 'react'

export default function PagoAlumnoForm({ onGenerar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    categoria: '',
    monto: '',
    fecha: '',
    telefono: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerar(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border rounded-lg p-2 w-full"
        required
      />
      <input
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        className="border rounded-lg p-2 w-full"
        required
      />
      <input
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        placeholder="Categoría"
        className="border rounded-lg p-2 w-full"
        required
      />
      <input
        type="number"
        name="monto"
        value={formData.monto}
        onChange={handleChange}
        placeholder="Monto"
        className="border rounded-lg p-2 w-full"
        required
      />
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
        required
      />
      <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono (ej: 54911xxxxxxxx)"
        className="border rounded-lg p-2 w-full"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 mt-2 transition-colors"
      >
        Generar comprobante
      </button>
    </form>
  )
}
