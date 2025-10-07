import React, { useState } from 'react'
import PagoAlumnoForm from '../components/PagoAlumnoForm'
import Comprobante from '../components/Comprobante'
import escudo from '../assets/images.jpeg'

export default function Home() {
  const [comprobante, setComprobante] = useState(null)

  const handleGenerarComprobante = (datos) => {
    setComprobante(datos)
  }

  const handleNuevo = () => {
    setComprobante(null)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-semibold text-center mb-4 text-blue-600">
        Cobrador Digital
      </h1>
      <img className='h-fit w-fit mx-auto mt-auto' src={escudo}></img>

      {!comprobante ? (
        <PagoAlumnoForm onGenerar={handleGenerarComprobante} />
      ) : (
        <Comprobante datos={comprobante} onNuevo={handleNuevo} />
      )}
    </div>
  )
}
