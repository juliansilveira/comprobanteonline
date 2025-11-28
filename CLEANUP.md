# Limpieza Post-Migración a Netlify

Este archivo contiene instrucciones para limpiar archivos de Vercel que ya no son necesarios.

## Archivos a Eliminar

Ahora que el proyecto usa Netlify, puedes eliminar los siguientes archivos relacionados con Vercel:

```bash
# Eliminar función de Vercel
rm -rf api/

# Eliminar configuración de Vercel
rm vercel.json

# Opcional: eliminar carpeta de cache de Vercel (si existe)
rm -rf .vercel/
```

## Verificar Antes de Eliminar

Asegúrate de que todo funciona correctamente en Netlify antes de eliminar estos archivos:

1. ✅ Despliega en Netlify
2. ✅ Prueba la generación de PDFs
3. ✅ Verifica que todo funcione correctamente
4. ✅ Solo entonces elimina los archivos de Vercel

## Comando Único

Si estás seguro de que todo funciona, puedes ejecutar:

```bash
rm -rf api/ vercel.json .vercel/
git add .
git commit -m "Limpieza: eliminados archivos de Vercel"
git push
```

## Mantener Ambos (Opcional)

Si quieres mantener compatibilidad con ambas plataformas:

- Mantén ambas carpetas: `/api` (Vercel) y `/netlify/functions` (Netlify)
- Mantén ambos archivos de configuración
- El frontend puede detectar automáticamente qué endpoint usar

Esto es útil si:

- Quieres poder desplegar en cualquiera de las dos plataformas
- Estás en período de transición
- Quieres tener un backup

## Nota

Los archivos de Vercel no interfieren con Netlify, así que no hay urgencia en eliminarlos. Puedes mantenerlos como respaldo hasta estar 100% seguro de la migración.
