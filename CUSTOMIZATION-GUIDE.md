# Guía de Personalización y Extensión

Esta guía te ayudará a personalizar y extender K&F Design según tus necesidades específicas.

## 🎨 Personalización de Diseño

### Cambiar Colores del Tema

Editar `/src/styles/theme.css`:

```css
:root {
  /* Colores principales */
  --primary: #C5A572;        /* Dorado/Ocre - Cambiar aquí */
  --accent: #A0522D;          /* Terracota - Cambiar aquí */
  --background: #fafafa;      /* Fondo */
  --foreground: #1a1a1a;      /* Texto principal */
  --secondary: #f5f5f5;       /* Gris claro */
  
  /* Otros colores */
  --card: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --ring: #C5A572;            /* Color de focus - cambiar si cambias primary */
}
```

### Cambiar Tipografía

1. Editar `/src/styles/fonts.css`:

```css
/* Cambiar Poppins por otra fuente de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@300;400;500;600;700&display=swap');
```

2. Editar `/src/styles/theme.css`:

```css
body {
  font-family: 'TuFuente', sans-serif;
}
```

### Fuentes Recomendadas

#### Modernas y Profesionales
- **Inter** - Muy legible, perfecta para UI
- **Outfit** - Geométrica y moderna
- **Plus Jakarta Sans** - Elegante y versátil
- **Manrope** - Minimalista y limpia

#### Elegantes y Sofisticadas
- **Playfair Display** - Para títulos elegantes
- **Cormorant** - Serif elegante
- **Crimson Pro** - Clásica y refinada

#### Bold y Llamativas
- **Montserrat** - Fuerte y moderna
- **Raleway** - Elegante pero impactante
- **Archivo** - Geométrica y atrevida

### Cambiar el Radio de Bordes

En `/src/styles/theme.css`:

```css
:root {
  --radius: 0.5rem;  /* Cambiar valor: 0 (cuadrado), 0.25rem (poco), 1rem (mucho) */
}
```

### Personalizar Animaciones

Crear archivo `/src/app/lib/animations.ts`:

```typescript
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3 }
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};
```

Usar en componentes:

```tsx
import { motion } from 'motion/react';
import { fadeIn } from '../lib/animations';

<motion.div {...fadeIn}>
  {/* Tu contenido */}
</motion.div>
```

---

## 🧩 Agregar Nuevas Secciones

### Agregar Sección "Nosotros"

1. Crear `/src/app/pages/about.tsx`:

```tsx
export function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Sobre Nosotros</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <img 
            src="URL_DE_TU_IMAGEN" 
            alt="K&F Design Team"
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
          <p className="mb-4">
            Fundada en 2010, K&F Design ha transformado más de 800 espacios...
          </p>
          {/* Más contenido */}
        </div>
      </div>
      
      {/* Sección de equipo, valores, etc. */}
    </div>
  );
}
```

2. Agregar ruta en `/src/app/routes.tsx`:

```tsx
{ path: 'about', Component: About },
```

3. Agregar enlace en Header:

```tsx
const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Proyectos', path: '/projects' },
  { name: 'Nosotros', path: '/about' },  // Nuevo
  { name: 'Contacto', path: '/#contact' },
];
```

### Agregar Blog

1. Crear estructura de datos en `/src/app/lib/mockData.ts`:

```typescript
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: Date;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tendencias de Diseño 2025',
    excerpt: 'Descubre las últimas tendencias en remodelación...',
    content: '...',
    author: 'K&F Design Team',
    coverImage: 'URL',
    category: 'Tendencias',
    tags: ['diseño', 'tendencias', '2025'],
    publishedAt: new Date('2025-01-15'),
  },
];
```

2. Crear componentes:

```tsx
// /src/app/pages/blog.tsx
// /src/app/pages/blog-post.tsx
// /src/app/components/blog-card.tsx
```

---

## 📱 Agregar Funcionalidades

### Sistema de Favoritos

1. Crear hook personalizado:

```typescript
// /src/app/lib/useFavorites.ts
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);
  
  const addFavorite = (projectId: string) => {
    const newFavorites = [...favorites, projectId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  
  const removeFavorite = (projectId: string) => {
    const newFavorites = favorites.filter(id => id !== projectId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  
  const isFavorite = (projectId: string) => favorites.includes(projectId);
  
  return { favorites, addFavorite, removeFavorite, isFavorite };
}
```

2. Agregar botón de favorito en ProjectCard:

```tsx
import { Heart } from 'lucide-react';
import { useFavorites } from '../lib/useFavorites';

export function ProjectCard({ project }: ProjectCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(project.id);
  
  return (
    <Card>
      {/* Contenido existente */}
      <button
        onClick={(e) => {
          e.preventDefault();
          favorite ? removeFavorite(project.id) : addFavorite(project.id);
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80"
      >
        <Heart className={favorite ? 'fill-red-500 text-red-500' : ''} />
      </button>
    </Card>
  );
}
```

### Búsqueda Avanzada

1. Crear componente SearchBar:

```tsx
// /src/app/components/search-bar.tsx
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
```

2. Implementar en página de proyectos:

```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredProjects = mockProjects.filter(p => 
  (category === 'all' || p.category.toLowerCase() === category) &&
  (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   p.description.toLowerCase().includes(searchQuery.toLowerCase()))
);
```

### Compartir en Redes Sociales

```tsx
// /src/app/components/share-buttons.tsx
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('Enlace copiado al portapapeles');
  };
  
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)}
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`)}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={copyToClipboard}
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### Galería con Lightbox

1. Instalar dependencia:

```bash
npm install yet-another-react-lightbox
```

2. Implementar:

```tsx
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const [lightboxOpen, setLightboxOpen] = useState(false);
const [photoIndex, setPhotoIndex] = useState(0);

<Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  index={photoIndex}
  slides={project.images.map(img => ({ src: img }))}
/>
```

---

## 🔧 Optimizaciones

### Lazy Loading de Imágenes

```tsx
// /src/app/components/lazy-image.tsx
import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
```

### Code Splitting por Ruta

En `/src/app/routes.tsx`:

```tsx
import { lazy } from 'react';

const Home = lazy(() => import('./pages/home'));
const Projects = lazy(() => import('./pages/projects'));
const Admin = lazy(() => import('./pages/admin'));

// Agregar Suspense en Layout
import { Suspense } from 'react';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div>Cargando...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

### Infinite Scroll

```tsx
import { useEffect, useRef } from 'react';

function useInfiniteScroll(callback: () => void) {
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (node) observer.current.observe(node);
  }, [callback]);
  
  return lastElementRef;
}
```

---

## 📊 Analytics

### Google Analytics

1. Instalar:

```bash
npm install react-ga4
```

2. Inicializar:

```tsx
// /src/app/lib/analytics.ts
import ReactGA from 'react-ga4';

export function initGA() {
  ReactGA.initialize('G-XXXXXXXXXX');
}

export function logPageView() {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
}
```

3. Usar en App:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { initGA, logPageView } from './lib/analytics';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    initGA();
  }, []);
  
  useEffect(() => {
    logPageView();
  }, [location]);
  
  // resto del código
}
```

---

## 🌐 Internacionalización (i18n)

### Agregar Múltiples Idiomas

1. Instalar:

```bash
npm install react-i18next i18next
```

2. Configurar:

```tsx
// /src/app/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        'hero.title': 'Tu visión, nuestra misión',
        'nav.home': 'Inicio',
        'nav.projects': 'Proyectos',
      }
    },
    en: {
      translation: {
        'hero.title': 'Your vision, our mission',
        'nav.home': 'Home',
        'nav.projects': 'Projects',
      }
    }
  },
  lng: 'es',
  fallbackLng: 'es',
});

export default i18n;
```

3. Usar:

```tsx
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  
  return (
    <nav>
      <Link to="/">{t('nav.home')}</Link>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </nav>
  );
}
```

---

## 🎭 Temas Oscuro/Claro

Ya existe `next-themes` instalado. Para implementar:

1. Agregar ThemeProvider en App:

```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="light">
  {/* resto del código */}
</ThemeProvider>
```

2. Agregar toggle en Header:

```tsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## 📝 Lista de Ideas para Extender

- [ ] Sistema de reserva de citas con calendario
- [ ] Chat en vivo con soporte
- [ ] Calculadora de presupuesto interactiva
- [ ] Galería de antes/después con slider
- [ ] Mapa interactivo de proyectos
- [ ] Sistema de referidos con códigos
- [ ] Newsletter y blog
- [ ] Testimonios en video
- [ ] Tour virtual 360° de proyectos
- [ ] Comparador de servicios
- [ ] Portal de cliente con seguimiento de proyecto
- [ ] Sistema de notificaciones push
- [ ] Integración con redes sociales (feed de Instagram)
- [ ] Generador de mood boards
- [ ] Sistema de puntos de fidelidad

---

## 🎓 Recursos de Aprendizaje

- **React**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Motion**: [motion.dev](https://motion.dev)
- **React Router**: [reactrouter.com](https://reactrouter.com)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)

---

## 💡 Tips de Desarrollo

1. **Usa TypeScript**: Aprovecha el tipado para evitar errores
2. **Componentes pequeños**: Divide en componentes reutilizables
3. **Custom Hooks**: Extrae lógica común en hooks personalizados
4. **Optimización**: Usa React.memo, useMemo, useCallback cuando sea necesario
5. **Accesibilidad**: Siempre incluye atributos aria y manejo de teclado
6. **Mobile First**: Diseña primero para móvil, luego escala
7. **Performance**: Usa Lighthouse para medir y mejorar
8. **SEO**: Agrega meta tags, Open Graph, Schema markup
