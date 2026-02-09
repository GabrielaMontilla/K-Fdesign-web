import { Link } from 'react-router';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                <img
                  src="/public/logo.png"
                  alt="Logo K&F Design"
                  className="h-6 w-6"
                  style={{ width: '80px', height: '70px' }}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-lg leading-none">K&F Design</span>
                <span className="text-xs text-gray-400">Remodelaciones</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Transformamos espacios en experiencias únicas. Calidad y prestigio en cada proyecto.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Remodelación Residencial</li>
              <li>Remodelación Comercial</li>
              <li>Diseño de Interiores</li>
              <li>Consultoría de Proyectos</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Estamos en el area de Dallas-Fort Worth, Texas</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (972) 741-1883</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:estimating@k-fdesign.com" className="hover:text-primary transition-colors">
                  estimating@k-fdesign.com
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 K&F Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
