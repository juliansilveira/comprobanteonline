import React, { useState } from "react";
import escudo from "../assets/images.png";

export default function ComprobantesApp() {
  const [seccion, setSeccion] = useState("alumno");
  const [cargandoPDF, setCargandoPDF] = useState(false);
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
      alert(
        "Por favor, ingrese un número de teléfono para enviar el comprobante."
      );
      return;
    }

    const mensaje = generarMensaje();
    const url = `https://wa.me/${formData.telefono}?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");
  };

  const generarPDF = async () => {
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.monto ||
      !formData.fecha
    ) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    setCargandoPDF(true);

    try {
      const response = await fetch("/.netlify/functions/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tipo: seccion,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comprobante-${formData.apellido}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al generar el PDF. Por favor, intente nuevamente.");
    } finally {
      setCargandoPDF(false);
    }
  };

  const generarPDFyEnviarWhatsApp = async () => {
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.monto ||
      !formData.fecha
    ) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    if (!formData.telefono) {
      alert(
        "Por favor, ingrese un número de teléfono para enviar por WhatsApp."
      );
      return;
    }

    setCargandoPDF(true);

    try {
      const response = await fetch("/.netlify/functions/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tipo: seccion,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comprobante-${formData.apellido}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const mensaje = `Hola! Te envío el comprobante de pago.\n\n📄 Nombre: ${formData.nombre} ${formData.apellido}\n💰 Monto: $${formData.monto}\n📅 Fecha: ${formData.fecha}\n\n*Por favor adjunta el archivo PDF descargado: comprobante-${formData.apellido}.pdf*`;
      const whatsappUrl = `https://wa.me/${
        formData.telefono
      }?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al generar el PDF. Por favor, intente nuevamente.");
    } finally {
      setCargandoPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Menú superior */}
        <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-700 flex justify-around py-3">
          <button
            className={`px-6 py-2 font-semibold rounded-md transition-all ${
              seccion === "alumno"
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-blue-500"
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
            className={`px-6 py-2 font-semibold rounded-md transition-all ${
              seccion === "socio"
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-blue-500"
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
        <div className="p-6">
          {/* Título y Logo */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-3">
              Cobrador Digital
            </h1>
            <img
              src={escudo}
              alt="Escudo del club"
              className="h-20 w-20 mx-auto object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            {seccion === "alumno"
              ? "Comprobante - Alumno"
              : "Comprobante - Socio"}
          </h2>

          {/* Formulario */}
          <form className="space-y-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Nombre"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Apellido"
                required
              />
            </div>

            {seccion === "alumno" && (
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Categoría
                </label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Ej: Infantil, Juvenil..."
                  required
                />
              </div>
            )}

            {seccion === "socio" && (
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Número de Socio
                </label>
                <input
                  type="text"
                  name="numeroSocio"
                  value={formData.numeroSocio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Ej: 0123"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Monto
              </label>
              <input
                type="number"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Monto en pesos"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Observación (opcional)
              </label>
              <textarea
                name="observacion"
                value={formData.observacion}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent min-h-[60px]"
                placeholder="Comentario u observación..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Número de WhatsApp
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Ej: 5491123456789"
                required
              />
            </div>

            {/* Botones */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={generarPDFyEnviarWhatsApp}
                disabled={cargandoPDF}
                className={`w-full py-3 rounded-lg font-semibold transition shadow-md ${
                  cargandoPDF
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {cargandoPDF
                  ? "Generando PDF..."
                  : "📄 Descargar PDF y Enviar por WhatsApp"}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={generarPDF}
                  disabled={cargandoPDF}
                  className={`py-2 rounded-lg font-semibold transition text-sm ${
                    cargandoPDF
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {cargandoPDF ? "..." : "📄 Solo PDF"}
                </button>

                <button
                  type="button"
                  onClick={enviarWhatsApp}
                  className="bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition text-sm"
                >
                  💬 Solo Texto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
