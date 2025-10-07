import React from "react";

export default function Header({ seccion, setSeccion }) {
  return (
    <nav className="w-full bg-white shadow-md flex justify-around py-3 sticky top-0 z-10">
      <button
        className={`px-4 py-2 font-semibold rounded-md ${
          seccion === "alumno"
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        onClick={() => setSeccion("alumno")}
      >
        Alumno
      </button>
      <button
        className={`px-4 py-2 font-semibold rounded-md ${
          seccion === "socio"
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        onClick={() => setSeccion("socio")}
      >
        Socio
      </button>
    </nav>
  );
}
