import React, { useState } from "react";

export default function ComprobantesApp() {
  const [seccion, setSeccion] = useState("alumno");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    categoria: "",
    numeroSocio: "",
    monto: "",
    fecha: "",
    observacion: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarMensaje = () => {
    if (seccion === "alumno") {
      return `Comprobante de Pago:
Nombre: ${formData.nombre}
Apellido: ${formData.apellido}
Categoría: ${formData.categoria}
Monto: $${formData.monto}
Fecha: ${formData.fecha}
${formData.observacion ? `Observación: ${formData.observacion}` : ""}`;
    } else {
      return `Comprobante de Pago - Socio:
Nombre: ${formData.nombre}
Apellido: ${formData.apellido}
N° Socio: ${formData.numeroSocio}
Monto: $${formData.monto}
Fecha: ${formData.fecha}
${formData.observacion ? `Observación: ${formData.observacion}` : ""}`;
    }
  };

  const enviarWhatsApp = () => {
    if (!formData.telefono) {
      alert("Por favor, ingrese un número de teléfono para enviar el comprobante.");
      return;
    }

    const mensaje = generarMensaje();
    const url = `https://wa.me/${formData.telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Menú superior */}
      <nav className="w-full bg-white shadow-md flex justify-around py-3 sticky top-0 z-10">
        <button
          className={`px-4 py-2 font-semibold rounded-md ${
            seccion === "alumno" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => {
            setSeccion("alumno");
            setFormData({
              nombre: "",
              apellido: "",
              categoria: "",
              numeroSocio: "",
              monto: "",
              fecha: "",
              observacion: "",
              telefono: "",
            });
          }}
        >
          Alumno
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-md ${
            seccion === "socio" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => {
            setSeccion("socio");
            setFormData({
              nombre: "",
              apellido: "",
              categoria: "",
              numeroSocio: "",
              monto: "",
              fecha: "",
              observacion: "",
              telefono: "",
            });
          }}
        >
          Socio
        </button>
      </nav>

      {/* Contenedor principal */}
      <div className="flex flex-col items-center w-full p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          {seccion === "alumno"
            ? "Comprobante de Pago - Alumno"
            : "Comprobante de Pago - Socio"}
        </h1>

        {/* Formulario común */}
        <form className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Nombre"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Apellido"
            />
          </div>

          {seccion === "alumno" && (
            <div>
              <label className="block text-gray-600 font-medium mb-1">Categoría</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
                placeholder="Ej: Infantil, Juvenil..."
              />
            </div>
          )}

          {seccion === "socio" && (
            <div>
              <label className="block text-gray-600 font-medium mb-1">Número de Socio</label>
              <input
                type="text"
                name="numeroSocio"
                value={formData.numeroSocio}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
                placeholder="Ej: 0123"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 font-medium mb-1">Monto</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Monto en pesos"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Observación (opcional)
            </label>
            <textarea
              name="observacion"
              value={formData.observacion}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Comentario u observación..."
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Número de WhatsApp
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Ej: 5491123456789"
            />
          </div>

          <button
            type="button"
            onClick={enviarWhatsApp}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
