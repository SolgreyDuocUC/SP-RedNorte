import React from 'react';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { centros } from '../types/home-slides';

export function CentrosSection() {
  return (
    <section id="centros" className="bg-[#f3f8fc] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b2f4f]">
              Nuestra Red de Centros
            </h2>
            <p className="text-[#5a6b7b] mt-4 text-lg leading-relaxed">
              Presencia estratégica en la región para acercar la atención médica a cada paciente, sin demoras ni barreras.
            </p>
          </div>

          <button className="text-[#0b2f4f] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            Ver mapa interactivo
            <ArrowUpRight className="h-5 w-5 opacity-80" />
          </button>
        </div>

        {/* Grid Centros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {centros.map((centro) => (
            <div
              key={centro.nombre}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-[#d7e6f2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header card */}
              <div className="flex justify-between items-start mb-4">

                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#e8f1f8] text-[#0b2f4f] group-hover:bg-[#0b2f4f] group-hover:text-white transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#f0f6fb] text-[#5a6b7b] px-2 py-1 rounded-md border border-[#d7e6f2]">
                  {centro.ciudad}
                </span>

              </div>

              {/* Title */}
              <h3 className="font-bold text-[#0b2f4f] text-lg mb-2 group-hover:text-[#0f3f66]">
                {centro.nombre}
              </h3>

              {/* Info */}
              <div className="space-y-3 mb-6">

                <div className="flex items-center gap-2 text-sm text-[#5a6b7b]">
                  <Clock className="h-4 w-4 text-[#0b2f4f]/70" />
                  <span>Horario: 08:00 - 20:00</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#5a6b7b] font-medium">
                  <Phone className="h-4 w-4 text-[#0b2f4f]/70" />
                  <a 
                    href={`tel:${centro.telefono}`} 
                    className="hover:text-[#0b2f4f] transition-colors"
                  >
                    {centro.telefono}
                  </a>
                </div>

              </div>

              {/* CTA */}
              <button className="w-full py-2.5 text-sm font-semibold text-[#0b2f4f] bg-[#e8f1f8] rounded-lg border border-[#d7e6f2] group-hover:bg-[#0b2f4f] group-hover:text-white transition-all">
                Cómo llegar
              </button>

            </div>
          ))}

        </div>

        {/* Banner ayuda */}
        <div className="mt-16 bg-gradient-to-r from-[#0b2f4f] to-[#0f3f66] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">

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
            className="mt-6 md:mt-0 relative z-10 bg-white text-[#0b2f4f] px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-[#f3f8fc] transition-colors"
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