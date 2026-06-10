import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onEspecialidadesClick: () => void;
  onExamenesClick: () => void;
}

export function HeroSection({ onEspecialidadesClick, onExamenesClick }: HeroSectionProps) {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden min-h-[580px] md:min-h-[640px] pt-24 pb-16"
      style={{
        background: 'linear-gradient(145deg, #e0f7fa 0%, #caf0f8 35%, #ffffff 70%, #e0f7fa 100%)',
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-70" aria-hidden>
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[110px] animate-pulse"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            animationDuration: '9s',
          }}
        />
        <div
          className="absolute -bottom-[20%] right-[10%] w-[60%] h-[60%] rounded-full blur-[120px]"
          style={{
            background: 'rgba(0, 150, 199, 0.18)',
            animationDuration: '12s',
          }}
        />
        <div 
          className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full blur-[100px]"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-gray-200 text-xs font-semibold text-[#023e8a] tracking-wide uppercase mb-8 backdrop-blur-sm shadow-sm"
          style={{
            letterSpacing: '0.12em',
          }}
        >
          Red de Atención Nacional
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.15] mb-10 select-none font-sans text-[#023e8a]"
        >
          Bienvenido a la mejor <br />
          red de salud
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">

          <button
            onClick={onEspecialidadesClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold bg-[#023e8a] text-white hover:bg-[#0077b6] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            Especialidades
          </button>

          <button
            onClick={onExamenesClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold bg-white border border-gray-200 text-[#023e8a] hover:bg-[#e0f7fa] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            Consulta tus exámenes
            <ArrowRight className="w-4 h-4 opacity-70" />
          </button>

        </div>
      </div>
    </section>
  );
}