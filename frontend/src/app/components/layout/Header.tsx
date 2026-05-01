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
  onLogout?: () => void;
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
      className={`fixed top-2 left-2 right-2 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-3 md:px-2 max-w-9xl mx-auto">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-5">

          {/* Back button */}
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          {/* Logo (más a la izquierda y compacto) */}
          <div className="flex items-center gap-2 select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077b6] to-[#023e8a] shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                <path
                  d="M12 3v18M3 12h18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="leading-tight">
              <span className="block font-bold text-[#023e8a] text-base">
                RedNorte
              </span>
              <span className="block text-[10px] text-[#0096c7] uppercase tracking-widest">
                Sistema de Salud
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-2">

          <button
            onClick={onAgenda}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <Calendar className="h-4 w-4" />
            Agenda
          </button>

          <button
            onClick={onProfile}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <User className="h-4 w-4" />
            Perfil
          </button>

          <button
            onClick={onSettings}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <Settings className="h-4 w-4" />
            Ajustes
          </button>
        </div>

        {/* RIGHT */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}