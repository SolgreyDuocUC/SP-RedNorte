import {
  ArrowLeft,
  Calendar,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onBack?: () => void;
  onAgenda?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void; // Esta función debe setear el estado "isLoggedIn" a false
}

export function Header({
  onBack,
  onAgenda,
  onProfile,
  onSettings,
  onLogout,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 border-b ${
        scrolled ? 'shadow-lg border-transparent' : 'shadow-sm border-slate-100'
      }`}
    >
      <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8 max-w-[1600px] mx-auto">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          {/* Botón Volver - Estilo CCdM */}
          <button
            onClick={onBack}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-50 hover:text-[#00a7b1] transition-all"
            title="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Logo RedNorte con colores Ciudad del Mar */}
          <div className="flex items-center gap-3 select-none group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004a87] shadow-inner group-hover:bg-[#003561] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                <path
                  d="M12 3v18M3 12h18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="leading-tight hidden sm:block">
              <span className="block font-black text-[#004a87] text-xl tracking-tight">
                RedNorte
              </span>
              <span className="block text-[10px] text-[#00a7b1] font-bold uppercase tracking-[0.2em]">
                Sistema de Salud
              </span>
            </div>
          </div>
        </div>

        {/* CENTER ACTIONS (Escritorio) */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
          {[
            { label: 'Agenda', icon: Calendar, onClick: onAgenda },
            { label: 'Perfil', icon: User, onClick: onProfile },
            { label: 'Ajustes', icon: Settings, onClick: onSettings },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:bg-white hover:text-[#004a87] hover:shadow-sm transition-all"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT SECTION: Logout */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-[1px] bg-slate-100 hidden md:block" />
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
}