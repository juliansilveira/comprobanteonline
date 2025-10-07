import React from 'react'

export default function Comprobante({ datos, onNuevo }) {
  const { nombre, apellido, categoria, monto, fecha, telefono } = datos

  const generarMensaje = () => {
    return `🏷️ *Comprobante de Pago*
👤 Nombre: ${nombre} ${apellido}
📘 Categoría: ${categoria}
💰 Monto: $${monto}
📅 Fecha: ${fecha}

✅ Gracias por su pago.`
  }

  const enviarPorWhatsApp = () => {
    if (!telefono) return alert("Falta el número de teléfono.")
    const mensaje = encodeURIComponent(generarMensaje())
    const url = `https://wa.me/${telefono}?text=${mensaje}`
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="bg-gray-50 border border-gray-300 rounded-xl shadow-md p-4 w-full">
        <h2 className="text-lg font-semibold text-blue-600 mb-2">
          Comprobante de Pago
        </h2>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Apellido:</strong> {apellido}</p>
        <p><strong>Categoría:</strong> {categoria}</p>
        <p><strong>Monto:</strong> ${monto}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <button
          onClick={enviarPorWhatsApp}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 transition-colors"
        >
          Enviar por WhatsApp
        </button>

        <button
          onClick={onNuevo}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors"
        >
          Generar otro comprobante
        </button>
      </div>
    </div>
  )
}
