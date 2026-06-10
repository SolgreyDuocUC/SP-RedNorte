import React from 'react';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { centros } from '../types/home-slides';

export function CentrosSection() {
  return (
    <section id="centros" className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#023e8a]">
              Nuestra Red de Centros
            </h2>
            <p className="text-gray-500 mt-4 text-lg leading-relaxed">
              Presencia estratégica en la región para acercar la atención médica a cada paciente, sin demoras ni barreras.
            </p>
          </div>

          <button className="text-[#023e8a] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            Ver mapa interactivo
            <ArrowUpRight className="h-5 w-5 opacity-80" />
          </button>
        </div>

        {/* Grid Centros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {centros.map((centro) => (
            <div
              key={centro.nombre}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header card */}
              <div className="flex justify-between items-start mb-4">

                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#e0f7fa] text-[#023e8a] group-hover:bg-[#023e8a] group-hover:text-white transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-widest bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">
                  {centro.ciudad}
                </span>

              </div>

              {/* Title */}
              <h3 className="font-bold text-[#023e8a] text-lg mb-2 group-hover:text-[#0077b6]">
                {centro.nombre}
              </h3>

              {/* Info */}
              <div className="space-y-3 mb-6">

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4 text-[#023e8a]/70" />
                  <span>Horario: 08:00 - 20:00</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Phone className="h-4 w-4 text-[#023e8a]/70" />
                  <a
                    href={`tel:${centro.telefono}`}
                    className="hover:text-[#023e8a] transition-colors"
                  >
                    {centro.telefono}
                  </a>
                </div>

              </div>

              {/* CTA */}
              <button className="w-full py-2.5 text-sm font-semibold text-[#023e8a] bg-[#e0f7fa] rounded-lg border border-gray-100 group-hover:bg-[#023e8a] group-hover:text-white transition-all">
                Cómo llegar
              </button>

            </div>
          ))}

        </div>

        {/* Banner ayuda */}
        <div className="mt-16 bg-gradient-to-r from-[#023e8a] to-[#0077b6] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">

          <div className="relative z-10 text-center md:text-left max-w-xl">
            <h3 className="text-2xl font-bold mb-2">
              ¿No sabes qué centro te corresponde?
            </h3>
            <p className="text-white/80">
              Te orientamos para que accedas al centro más cercano según tu necesidad médica.
            </p>
          </div>

          <a 
            href="tel:6001234567"
            className="mt-6 md:mt-0 relative z-10 bg-white text-[#023e8a] px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-[#e0f7fa] transition-colors"
          >
            Contactar Central
          </a>

          {/* decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        </div>

      </div>
    </section>
  );
}