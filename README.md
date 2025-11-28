# Sistema de Comprobantes de Pago 🧾

Aplicación web para generar comprobantes de pago profesionales para alumnos y socios, con generación de PDFs y envío por WhatsApp.

## 🚀 Características

- ✅ Generación de comprobantes para **Alumnos** y **Socios**
- 📄 **Descarga de PDFs** profesionales
- 💬 Envío directo por **WhatsApp**
- 🎨 Interfaz moderna y responsive
- ⚡ Backend serverless (Netlify Functions)
- 🆓 Compatible con plan gratuito de Netlify

## 🛠️ Tecnologías

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Backend**: Netlify Functions
- **PDF**: PDFKit
- **Hosting**: Netlify

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>
cd escuelita

# Instalar dependencias
npm install

# Desarrollo local (sin serverless functions)
npm run dev

# Desarrollo con Netlify Functions
netlify dev
```

## 🎯 Uso

### Generar Comprobante

1. Selecciona el tipo: **Alumno** o **Socio**
2. Completa el formulario con los datos requeridos
3. Elige una opción:
   - **📄 Descargar PDF**: Genera y descarga el comprobante en formato PDF
   - **Enviar por WhatsApp**: Envía el comprobante como mensaje de texto

### Campos Requeridos

**Para Alumnos:**

- Nombre y Apellido
- Categoría (ej: Infantil, Juvenil)
- Monto
- Fecha
- Teléfono (para WhatsApp)
- Observación (opcional)

**Para Socios:**

- Nombre y Apellido
- Número de Socio
- Monto
- Fecha
- Teléfono (para WhatsApp)
- Observación (opcional)

## 🚀 Despliegue en Netlify

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones detalladas.

**Resumen rápido:**

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Desplegar
netlify deploy --prod
```

O desde la web de Netlify:

1. Importa tu repositorio en [app.netlify.com](https://app.netlify.com)
2. Haz clic en "Deploy"
3. ¡Listo! 🎉

## 📁 Estructura del Proyecto

```
escuelita/
├── netlify/
│   └── functions/
│       └── generate-pdf.js   # Función serverless para PDFs
├── src/
│   ├── components/
│   │   ├── ComprobantesApp.jsx  # Componente principal
│   │   ├── Comprobante.jsx      # Vista del comprobante
│   │   ├── PagoAlumnoForm.jsx   # Formulario
│   │   └── Header.jsx           # Encabezado
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   └── main.jsx
├── netlify.toml             # Configuración de Netlify
├── package.json
└── README.md
```

## 🔧 API

### POST `/.netlify/functions/generate-pdf`

Genera un PDF del comprobante.

**Request Body:**

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "categoria": "Infantil",
  "monto": "5000",
  "fecha": "2025-11-28",
  "observacion": "Pago mensual",
  "tipo": "alumno"
}
```

**Response:**

- PDF file (application/pdf)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Proyecto de práctica para uso real.

---

**¿Necesitas ayuda?** Consulta [DEPLOYMENT.md](DEPLOYMENT.md) para más información sobre despliegue y solución de problemas.
