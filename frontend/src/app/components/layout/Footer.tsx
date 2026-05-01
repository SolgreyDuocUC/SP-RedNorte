import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoFull from '@/app/assets/logo-sf-1.svg';

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
    <footer className="bg-[#023e8a] text-white pt-10">

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">

        {/* Logo */}
        <div className="space-y-4">
          <img src={logoFull} alt="Red Norte" className="h-12 w-auto" />

          <p className="text-sm text-blue-100/80 leading-relaxed max-w-xs">
            Red de Salud comprometida con la comunidad de la región de Tarapacá,
            brindando atención de calidad con calidez humana y tecnología de vanguardia.
          </p>
        </div>

        {/* Links */}
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

        {/* Contacto */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-cyan-300 uppercase tracking-wider">
            Contacto
          </h4>

          <ul className="space-y-4 text-sm text-blue-100/70">

            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p>Valparaíso, Región de Valparaíso</p>
                <p>Quilpué, Región de Valparaíso</p>
                <p>Los Andes, Región de Valparaíso</p>
                <p>Viña del Mar, Región de Valparaíso</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-cyan-400" />
              <a href="tel:6001234567">600 123 4567</a>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-cyan-400" />
              <a href="mailto:contacto@rednorte.cl">contacto@rednorte.cl</a>
            </li>

          </ul>
        </div>

      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-xs text-blue-200/50 flex justify-between">
          <p>© {currentYear} Red Norte · Todos los derechos reservados.</p>
        </div>
      </div>

    </footer>
  );
}