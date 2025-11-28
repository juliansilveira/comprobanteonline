# Instrucciones de Despliegue en Netlify

## Configuración Inicial

Tu proyecto ya está configurado para funcionar en Netlify con las siguientes características:

- ✅ Backend serverless en `/netlify/functions/generate-pdf.js`
- ✅ Generación de PDFs con PDFKit
- ✅ Frontend React con Vite
- ✅ Configuración de Netlify en `netlify.toml`

## Pasos para Desplegar

### 1. Preparar el Repositorio

Asegúrate de que todos los archivos estén commiteados:

```bash
git add .
git commit -m "Agregado backend PDF con Netlify Functions"
git push
```

### 2. Desplegar en Netlify

#### Opción A: Desde la Web de Netlify

1. Ve a [app.netlify.com](https://app.netlify.com)
2. Haz clic en "Add new site" → "Import an existing project"
3. Conecta tu repositorio de GitHub/GitLab/Bitbucket
4. Netlify detectará automáticamente la configuración de `netlify.toml`
5. Haz clic en "Deploy site"

#### Opción B: Desde la Terminal (CLI)

```bash
# Instalar Netlify CLI (si no lo tienes)
npm install -g netlify-cli

# Login
netlify login

# Inicializar (solo la primera vez)
netlify init

# Desplegar
netlify deploy --prod
```

### 3. Verificar el Despliegue

Una vez desplegado, verifica que:

- ✅ La aplicación carga correctamente
- ✅ Puedes generar comprobantes
- ✅ El botón "Descargar PDF" funciona
- ✅ El PDF se descarga con el formato correcto

## Configuración de Netlify

El archivo `netlify.toml` ya está configurado con:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Esto asegura que:

- Las funciones serverless estén en `/netlify/functions`
- El SPA routing funcione correctamente
- El build se ejecute automáticamente

## Funcionalidades Implementadas

### Backend

- **Endpoint**: `/.netlify/functions/generate-pdf`
- **Método**: POST
- **Librería**: PDFKit
- **Formato**: PDF profesional con diseño estructurado

### Frontend

- **Botón "Descargar PDF"**: Genera y descarga el comprobante
- **Estados de carga**: Muestra "Generando PDF..." mientras procesa
- **Validación**: Verifica que todos los campos requeridos estén completos
- **Compatibilidad**: Funciona tanto para Alumnos como para Socios

## Solución de Problemas

### Error: "Error al generar el PDF"

- Verifica que todos los campos requeridos estén completos
- Revisa los logs en Netlify Dashboard → Functions → Logs
- Asegúrate de que PDFKit esté instalado: `npm install`

### El PDF no se descarga

- Verifica que tu navegador permita descargas automáticas
- Prueba en modo incógnito para descartar extensiones
- Revisa la consola del navegador para errores

### Timeout en Netlify

- El plan gratuito tiene límite de 10 segundos por función
- Si necesitas más tiempo, considera optimizar o actualizar el plan

### Error 404 en las funciones

- Verifica que la carpeta sea `/netlify/functions` (no `/api`)
- Asegúrate de que `netlify.toml` esté en la raíz del proyecto
- Redespliega el sitio después de agregar funciones

## Desarrollo Local

Para probar localmente con las funciones serverless:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Ejecutar en modo desarrollo
netlify dev
```

Esto iniciará el servidor local con las funciones serverless funcionando en `http://localhost:8888`

## Diferencias con Vercel

Si migraste desde Vercel, estos son los cambios principales:

| Aspecto              | Vercel                              | Netlify                             |
| -------------------- | ----------------------------------- | ----------------------------------- |
| Carpeta de funciones | `/api`                              | `/netlify/functions`                |
| Endpoint             | `/api/function-name`                | `/.netlify/functions/function-name` |
| Formato de función   | `export default function handler()` | `exports.handler = async ()`        |
| Configuración        | `vercel.json`                       | `netlify.toml`                      |
| Respuesta            | Stream directo                      | Base64 encoded                      |

## Notas Importantes

- 🆓 **Plan Gratuito**: Este proyecto funciona perfectamente en el plan gratuito de Netlify
- 📦 **Límites**: 100GB de ancho de banda por mes, 125k invocaciones de funciones
- ⚡ **Serverless**: Las funciones se ejecutan bajo demanda, sin servidor permanente
- 🔒 **Seguridad**: No se almacenan datos, todo se genera en tiempo real
- 🗑️ **Limpieza**: Puedes eliminar la carpeta `/api` y `vercel.json` si ya no usas Vercel

## Variables de Entorno (Opcional)

Si necesitas agregar variables de entorno en el futuro:

1. Ve a Netlify Dashboard → Site settings → Environment variables
2. Agrega tus variables
3. Redespliega el sitio

Para desarrollo local, crea un archivo `.env`:

```bash
# .env
MI_VARIABLE=valor
```

Y accede en las funciones con `process.env.MI_VARIABLE`
