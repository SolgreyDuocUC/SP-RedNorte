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
    <footer className="bg-[#023e8a] text-white pt-10">

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">

        {/* Columna 1 */}
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

        {/* Columna 2 */}
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

        {/* Columna 3 */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-cyan-300 uppercase tracking-wider">
            Contacto
          </h4>

          <ul className="space-y-4 text-sm text-blue-100/70">

            {/* Ubicaciones */}
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">

                <p>Valparaíso, Región de Valparaíso</p>
                <p>Quilpué, Región de Valparaíso</p>
                <p>Los Andes, Región de Valparaíso</p>
                <p>Viña del Mar, Región de Valparaíso</p>

                <p className="mt-2 text-blue-200/60 text-xs uppercase tracking-wider">
                  Región Metropolitana
                </p>
                <p>Santiago Centro</p>
                <p>Providencia</p>
                <p>Maipú</p>

                <p className="mt-2 text-blue-200/60 text-xs uppercase tracking-wider">
                  Otras regiones
                </p>
                <p>Rancagua, Región de O’Higgins</p>
                <p>Concepción, Región del Biobío</p>
                <p>La Serena, Región de Coquimbo</p>

              </div>
            </li>

            {/* Teléfono */}
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-cyan-400 shrink-0" />
              <a href="tel:6001234567" className="hover:text-white transition-colors">
                600 123 4567
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-cyan-400 shrink-0" />
              <a href="mailto:contacto@rednorte.cl" className="hover:text-white transition-colors">
                contacto@rednorte.cl
              </a>
            </li>

          </ul>
        </div>

      </div>

      {/* FOOTER INFERIOR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/50">

          <p>
            © {currentYear} Red Norte · Red de Salud. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}