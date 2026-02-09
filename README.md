# K&F Design - Aplicación Web de Remodelaciones

Una aplicación web moderna, profesional y completa para una empresa de remodelaciones residenciales y comerciales.

## 🎯 Características Principales

### Portafolio Digital
- Galería completa de proyectos con imágenes de alta calidad
- Sistema de calificaciones y reseñas
- Filtrado por categoría (Residencial/Comercial)
- Vista detallada de cada proyecto

### Sistema de Gestión de Clientes
- Registro y autenticación de usuarios
- Perfiles de usuario personalizados
- Historial de comentarios y reseñas
- Roles diferenciados (Cliente/Admin)

### Plataforma de Contacto y Cotización
- Formulario de contacto integrado
- Solicitudes de cotización con detalles del servicio
- Sistema de mensajería (preparado para integración backend)

### Panel Administrativo
- Acceso exclusivo para administrador
- Dashboard con métricas importantes
- Gestión de proyectos
- Lista de clientes
- Gestión de solicitudes de cotización
- Moderación de comentarios

## 🎨 Diseño

- **Estilo**: Minimalista, limpio, elegante, moderno y profesional
- **Tipografía**: Poppins (Google Fonts)
- **Colores**:
  - Fondo: `#fafafa` (blanco suave)
  - Texto: `#1a1a1a` (gris oscuro/negro)
  - Primario: `#C5A572` (dorado/ocre)
  - Acento: `#A0522D` (terracota oscuro)
  - Secundario: `#f5f5f5` (gris claro)
- **Responsive**: Optimizado para desktop, tablet y móvil
- **Animaciones**: Transiciones suaves con Motion (Framer Motion)

## 🛠️ Tecnología

- **Frontend**: React 18.3.1 con TypeScript
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **UI Components**: ShadCN UI
- **Animaciones**: Motion (Framer Motion)
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Estructura del Proyecto

```
/src
  /app
    /components      # Componentes reutilizables
      /ui           # Componentes de UI (ShadCN)
      header.tsx    # Encabezado con navegación
      footer.tsx    # Pie de página
      layout.tsx    # Layout principal
      project-card.tsx
    /lib
      authContext.tsx  # Contexto de autenticación
      mockData.ts      # Datos simulados
    /pages
      home.tsx         # Página de inicio
      projects.tsx     # Lista de proyectos
      project-detail.tsx
      login.tsx
      register.tsx
      profile.tsx
      admin.tsx        # Panel administrativo
      not-found.tsx
    routes.tsx        # Configuración de rutas
    App.tsx          # Componente raíz
  /styles
    fonts.css        # Importación de fuentes
    theme.css        # Variables de tema
    index.css        # Estilos base
    tailwind.css     # Configuración de Tailwind
/public
  manifest.json      # Manifiesto PWA
  sw.js             # Service Worker
```

## 🚀 Páginas Implementadas

### 🏠 Inicio (/)
- Hero section con imagen impactante
- Estadísticas de la empresa
- Proyectos destacados (rating ≥ 4.9)
- Testimonios recientes
- Formulario de cotización

### 🏗️ Proyectos (/projects)
- Lista completa de proyectos
- Filtro por categoría
- Botón "Cargar más"
- Tarjetas con preview

### 🏢 Detalle de Proyecto (/projects/:id)
- Galería de imágenes
- Descripción completa
- Sistema de reseñas
- Formulario de comentarios (usuarios autenticados)

### 🔐 Autenticación
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios

### 👤 Perfil (/profile)
- Información del usuario
- Historial de comentarios
- Botón de cerrar sesión

### 📊 Admin (/admin)
- **Acceso restringido**: Solo `estimating@k-fdesign.com`
- Dashboard con métricas
- Gestión de proyectos
- Lista de clientes
- Solicitudes de cotización
- Gestión de comentarios

## 🔒 Autenticación

### Sistema Mock (Actual)
- Cualquier usuario puede registrarse como "Cliente"
- El email `estimating@k-fdesign.com` tiene rol de "Admin"
- Los datos se almacenan en localStorage
- No se valida contraseña en la demo


```

## 💾 Datos

El proyecto incluye datos simulados en `/src/app/lib/mockData.ts`:

### Colecciones
- **Projects**: 6 proyectos de ejemplo con imágenes de Unsplash
- **Reviews**: Comentarios y calificaciones
- **Users**: Usuarios registrados
- **Appointments**: Solicitudes de cotización

### Estructura de Datos

```typescript
// Usuario
{
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

// Proyecto
{
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  rating: number;
  category: string;
  createdAt: Date;
}

// Reseña
{
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  createdAt: Date;
}

// Cita
{
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType: string;
  createdAt: Date;
}
```

## 📱 Progressive Web App (PWA)

La aplicación está preparada para funcionar como PWA:

- ✅ Manifest configurado
- ✅ Service Worker implementado
- ✅ Caché offline básico
- ✅ Instalable en dispositivos móviles
- ✅ Modo standalone

**Ver**: `/PWA-SETUP.md` para instrucciones de implementación completa

## 🎯 Funcionalidades Implementadas

### Frontend
- ✅ Diseño responsive completo
- ✅ Navegación con React Router
- ✅ Sistema de autenticación mock
- ✅ CRUD simulado para comentarios
- ✅ Filtros y búsqueda
- ✅ Animaciones suaves
- ✅ Notificaciones toast
- ✅ Formularios validados

### Preparado para Backend
- ✅ Estructura de datos definida
- ✅ Contexto de autenticación
- ✅ Servicios mock listos para reemplazar
- ✅ Manejo de estados y loading
- ✅ Manejo de errores

## 🔄 Integración Backend (Futuro)

Para integrar con backend real (Firebase/Supabase):

### 1. Reemplazar Mock Auth
```typescript
// En authContext.tsx
// Reemplazar funciones mock por llamadas reales a Firebase/Supabase
```

### 2. Conectar Base de Datos
```typescript
// Reemplazar mockData.ts con llamadas a API
// Implementar hooks personalizados para fetching de datos
```

### 3. Sistema de Correo
```typescript
// Implementar envío de emails cuando:
// - Usuario solicita cotización
// - Se recibe nueva reseña
// - Se registra nuevo usuario
```

### 4. Almacenamiento de Imágenes
```typescript
// Implementar upload de imágenes
// Conectar con Firebase Storage o Supabase Storage
```

### 5. Reglas de Seguridad
```
// Firestore/Supabase Rules:
// - Admin: acceso total
// - Usuarios: pueden crear/editar solo sus reseñas
// - Público: puede leer proyectos
```

## 📧 Sistema de Correo (Preparado)

Cuando se implemente el backend, los correos deben enviarse a:
**`estimating@k-fdesign.com`**

### Eventos que disparan correos:
1. Nueva solicitud de cotización
2. Nuevo registro de usuario
3. Nueva reseña publicada
4. Mensaje de contacto

## 🎨 Componentes UI Disponibles

Todos los componentes de ShadCN UI están disponibles:
- Button, Card, Input, Label, Textarea
- Select, Tabs, Table, Badge
- Dialog, Dropdown Menu, Toast
- Y muchos más...

## 🔐 Rutas Protegidas

- `/profile` - Requiere autenticación
- `/admin` - Requiere ser admin (`estimating@k-fdesign.com`)

## 📝 Próximos Pasos

### Integración Backend
1. Conectar con Firebase o Supabase
2. Implementar autenticación real
3. Configurar base de datos
4. Implementar sistema de correo

### Funcionalidades Adicionales
1. Búsqueda avanzada de proyectos
2. Sistema de favoritos
3. Compartir en redes sociales
4. Blog/Noticias
5. Chat en vivo
6. Sistema de notificaciones
7. Análisis y métricas con Google Analytics

### Mejoras de Rendimiento
1. Lazy loading de imágenes
2. Code splitting por rutas
3. Optimización de bundle
4. CDN para assets estáticos

## 🌐 Deploy

### Recomendaciones de hosting:
- **Vercel** - Óptimo para React/Vite
- **Netlify** - Excelente para JAMstack
- **Firebase Hosting** - Si usas Firebase como backend
- **Cloudflare Pages** - Rápido y con CDN global

### Variables de entorno (futuro)
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_SENDGRID_API_KEY=
```

## 📄 Licencia

© 2025 K&F Design. Todos los derechos reservados.

## 👥 Créditos

- Imágenes: Unsplash
- Iconos: Lucide React
- UI Components: ShadCN UI
- Tipografía: Google Fonts (Poppins)
