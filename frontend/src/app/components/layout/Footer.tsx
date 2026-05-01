import React from 'react';
import { Phone, Mail, MapPin, Activity } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    'Especialidades',
    'Servicios y Unidades',
    'Seguros y Convenios',
    'Información al Paciente',
    'Portal de Resultados'
  ];

  return (
    <footer className="bg-[#023e8a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1: Branding y Propósito */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Red Norte</span>
          </div>
          <p className="text-sm text-blue-100/80 leading-relaxed max-w-xs">
            Red de Salud comprometida con la comunidad de la región de Tarapacá, 
            brindando atención de calidad con calidez humana y tecnología de vanguardia.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-cyan-300 uppercase tracking-wider">
            Acceso rápido
          </h4>
          <ul className="space-y-2 text-sm text-blue-100/70">
            {quickLinks.map((link) => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-cyan-300 uppercase tracking-wider">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm text-blue-100/70">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0" />
              <span>Iquique, Región de Tarapacá, Chile</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-cyan-400 shrink-0" />
              <a href="tel:6001234567" className="hover:text-white transition-colors">
                600 123 4567
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-cyan-400 shrink-0" />
              <a href="mailto:contacto@rednorte.cl" className="hover:text-white transition-colors">
                contacto@rednorte.cl
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra Inferior de Copyright */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pt-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/50">
          <p>© {currentYear} Red Norte · Red de Salud. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}