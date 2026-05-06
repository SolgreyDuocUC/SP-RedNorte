import React from 'react';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { centros } from '../types/home-slides';

export function CentrosSection() {
  return (
    <section id="centros" className="bg-[#f0f6fa] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Cabecera de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#023e8a] tracking-tight">
              Nuestra Red de Centros
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Presencia estratégica en la Región de Tarapacá para estar siempre cerca de ti y tu familia.
            </p>
          </div>
          <button className="text-[#0096c7] font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Ver mapa interactivo <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>

        {/* Grid de Centros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {centros.map((centro) => (
            <div
              key={centro.nombre}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#90e0ef] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Badge Ciudad */}
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0096c7] group-hover:bg-[#0096c7] group-hover:text-white transition-colors flex">
                  <MapPin className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">
                  {centro.ciudad}
                </span>
              </div>

              {/* Información del Centro */}
              <h3 className="font-bold text-[#023e8a] text-lg mb-2 group-hover:text-[#0077b6]">
                {centro.nombre}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4 text-cyan-500" />
                  <span>Abierto: 08:00 - 20:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <Phone className="h-4 w-4 text-cyan-500" />
                  <a href={`tel:${centro.telefono}`} className="hover:text-[#0096c7]">
                    {centro.telefono}
                  </a>
                </div>
              </div>

              {/* Botón de acción interno */}
              <button className="w-full py-2 text-sm font-semibold text-[#0096c7] bg-cyan-50 rounded-lg group-hover:bg-[#0096c7] group-hover:text-white transition-all">
                Cómo llegar
              </button>
            </div>
          ))}
        </div>

        {/* Banner de Ayuda Directa */}
        <div className="mt-16 bg-gradient-to-r from-[#023e8a] to-[#0077b6] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">¿No sabes qué centro te queda más cerca?</h3>
            <p className="text-blue-100 opacity-90">Llámanos y te orientamos sobre convenios y disponibilidad.</p>
          </div>
          <a 
            href="tel:6001234567"
            className="mt-6 md:mt-0 relative z-10 bg-white text-[#023e8a] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-cyan-50 transition-colors"
          >
            Contactar Central
          </a>
          
          {/* Círculos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
      </div>
    </section>
  );
}