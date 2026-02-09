# Configuración PWA para K&F Design

## Archivos creados

Se han creado los siguientes archivos para soporte PWA:

- `/public/manifest.json` - Manifiesto de la aplicación web
- `/public/sw.js` - Service Worker para funcionalidad offline

## Pasos para habilitar PWA completa

### 1. Agregar al index.html

Agregar estas líneas en el `<head>` del archivo index.html:

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Theme color -->
<meta name="theme-color" content="#C5A572">

<!-- iOS specific meta tags -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="K&F Design">
<link rel="apple-touch-icon" href="/icon-192.png">

<!-- Description -->
<meta name="description" content="Transformamos espacios en experiencias únicas con diseño, calidad y prestigio">
```

### 2. Registrar Service Worker

Agregar este código al final del `<body>` en index.html o en el archivo principal:

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });
  }
</script>
```

### 3. Crear Iconos

Crear los siguientes archivos de imagen en `/public/`:

- `icon-192.png` - Icono de 192x192 píxeles
- `icon-512.png` - Icono de 512x512 píxeles
- `screenshot1.png` - Captura de pantalla de 540x720 píxeles

**Recomendación de diseño para iconos:**
- Fondo dorado (#C5A572)
- Texto "K&F" en blanco
- Diseño minimalista y profesional

### 4. Configuración HTTPS

Para que PWA funcione correctamente en producción:
- La aplicación debe servirse a través de HTTPS
- Solo en desarrollo puede funcionar con HTTP localhost

### 5. Testing PWA

Para probar la PWA:

1. Abrir Chrome DevTools
2. Ir a la pestaña "Application"
3. Verificar "Manifest" - debe mostrar todos los datos correctamente
4. Verificar "Service Workers" - debe estar registrado y activo
5. En el menú de Chrome, debe aparecer la opción "Instalar K&F Design"

### 6. Características PWA Implementadas

✅ Manifest configurado
✅ Service Worker básico
✅ Caché offline
✅ Instalable en dispositivos
✅ Modo standalone
✅ Colores de tema personalizados

### 7. Mejoras Futuras (Opcionales)

- Agregar más rutas al caché del Service Worker
- Implementar estrategias de caché más avanzadas
- Agregar notificaciones push
- Implementar sincronización en segundo plano
- Agregar más screenshots para diferentes tamaños
