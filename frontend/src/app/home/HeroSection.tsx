import { ArrowRight, HeartPulse, ShieldCheck, Users, Clock3 } from 'lucide-react';

interface HeroSectionProps {
  onEspecialidadesClick: () => void;
  onExamenesClick: () => void;
}

export function HeroSection({ onEspecialidadesClick, onExamenesClick }: HeroSectionProps) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden min-h-[640px] lg:min-h-[680px] pt-24 pb-20 md:py-24 bg-gradient-to-b from-sky-50/60 via-white to-white"
    >
      {/* Layered background glow: cool blue + warm amber for a professional yet warm feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden>
        <div
          className="absolute top-1/2 -right-[15%] w-[55%] h-[110%] rounded-full opacity-30 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(0, 150, 199, 0.22) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-[10%] w-[45%] h-[70%] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 109, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

        {/* Left Column - Text Hierarchy & CTA */}
        <div className="lg:col-span-6 flex flex-col items-start text-left max-w-xl">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0077b6] tracking-wider uppercase mb-6 shadow-sm select-none"
          >
            <HeartPulse className="w-3.5 h-3.5" />
            Unificando salud para todos
          </div>

          {/* Eyebrow */}
          <p
            className="text-lg sm:text-xl font-semibold tracking-wide leading-relaxed mb-3 select-none font-sans text-[#0096c7]"
          >
            RedNorte
          </p>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.15] mb-6 select-none font-sans text-[#023e8a]"
          >
            Tu acceso unificado a la mejor salud{' '}
            <span className="bg-gradient-to-r from-[#0077b6] to-[#0096c7] bg-clip-text text-transparent">
              pública y privada
            </span>
          </h1>

          {/* Descriptive paragraph */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
            Garantizamos una derivación ágil y una atención cálida en todos los centros de nuestra red, uniendo fuerzas para cuidar de ti y tu familia.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onEspecialidadesClick}
              className="w-full sm:w-auto px-9 py-3.5 rounded-full text-base font-semibold bg-[#0077b6] text-white hover:bg-[#023e8a] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-center"
            >
              Reservar una hora
            </button>

            <button
              onClick={onExamenesClick}
              className="w-full sm:w-auto px-9 py-3.5 rounded-full text-base font-medium bg-white border border-gray-200 text-[#0077b6] hover:border-[#0096c7] hover:bg-sky-50/60 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 text-center shadow-sm"
            >
              Consulta tus exámenes
              <ArrowRight className="w-4 h-4 opacity-80" />
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-gray-100 w-full">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4 text-[#0096c7]" />
              Red de centros médicos
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#0096c7]" />
              Atención segura y confiable
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock3 className="w-4 h-4 text-[#0096c7]" />
              Derivaciones ágiles
            </div>
          </div>

        </div>

        {/* Right Column - Warm, Friendly Image */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center w-full relative">

          {/* Main Image Container */}
          <div className="relative w-full max-w-[500px] aspect-[5/6] rounded-3xl overflow-hidden shadow-xl bg-slate-50 border border-gray-100">
            <img
              src="https://www.uc.cl/site/assets/files/15665/atencion_salud.700x532.jpg"
              alt="Interacción cálida y amigable entre doctora y paciente mayor"
              className="w-full h-full object-cover object-[center_35%] transform hover:scale-105 transition duration-700 select-none pointer-events-none"
            />
            {/* Warm-to-cool vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#023e8a]/25 via-transparent to-amber-100/10 pointer-events-none" />
          </div>

          {/* Floating info card */}
          <div className="absolute -bottom-6 left-4 sm:-left-6 bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-4 flex items-center gap-3 max-w-[230px]">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 text-[#0077b6] flex-shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-600 leading-snug">
              <span className="font-semibold text-[#023e8a]">Atención cercana</span> en cada etapa de tu proceso
            </p>
          </div>

          {/* Subtle Decorative Accent */}
          <div className="absolute -top-6 -right-2 w-16 h-16 rounded-full border border-sky-100/70 pointer-events-none select-none hidden lg:block" style={{ borderStyle: 'dashed' }} />
        </div>

      </div>
    </section>
  );
}
