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
        background: 'linear-gradient(145deg, #e8f1f8 0%, #d6e6f2 35%, #ffffff 70%, #cfe2f3 100%)',
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
            background: 'rgba(120, 170, 210, 0.35)',
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#c7d9ea] text-xs font-semibold text-[#0b2f4f] tracking-wide uppercase mb-8 backdrop-blur-sm shadow-sm"
          style={{
            letterSpacing: '0.12em',
          }}
        >
          Red de Atención Nacional
        </div>

        {/* Title */}
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.15] mb-10 select-none font-sans"
          style={{
            color: '#0b2f4f',
          }}
        >
          Bienvenido a la mejor <br />
          red de salud
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">

          <button
            onClick={onEspecialidadesClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold bg-[#0b2f4f] text-white hover:bg-[#0f3f66] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            Especialidades
          </button>

          <button
            onClick={onExamenesClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold bg-white border border-[#c7d9ea] text-[#0b2f4f] hover:bg-[#f4f9fc] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            Consulta tus exámenes
            <ArrowRight className="w-4 h-4 opacity-70" />
          </button>

        </div>
      </div>
    </section>
  );
}