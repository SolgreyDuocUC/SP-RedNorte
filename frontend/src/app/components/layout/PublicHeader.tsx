import { useState, useEffect } from 'react';
import { ChevronDown, User, Phone } from 'lucide-react';
import { navItems } from '../../types/home-slides';
import logoFull from '@/app/assets/logo-sf-1.svg';

interface PublicHeaderProps {
  onLogin: () => void;
  onReserva?: () => void;
}

export function PublicHeader({ onLogin, onReserva }: PublicHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-2 left-2 right-2 z-50 bg-white transition-all duration-300 rounded-xl ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* TOP BAR */}
      <div className="hidden md:flex items-center justify-end gap-5 px-6 py-1.5 bg-[#023e8a] text-white text-xs rounded-t-xl">
        <a href="#centros" className="flex items-center gap-1 hover:text-cyan-300 transition">
          <Phone className="h-3 w-3" />
          Centros
        </a>
        <span className="opacity-40">|</span>
        <a href="#" className="hover:text-cyan-300 transition">Urgencias 24/7</a>
        <span className="opacity-40">|</span>
        <a href="#" className="hover:text-cyan-300 transition">Portal Médico</a>
      </div>

      {/* MAIN HEADER */}
      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        {/* LOGO */}
        <div className="flex items-center select-none">
          <img src={logoFull} alt="Red Norte" className="h-10 w-auto" />
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-100 hover:text-[#0077b6] transition"
            >
              {item.label}
              {item.dropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
            </button>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-2">

          <button
            className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Mi Portal
          </button>

          <button
            onClick={onReserva}
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#0096c7] text-white hover:bg-[#0077b6] transition"
          >
            Reservar hora
          </button>

          <button
            onClick={onLogin}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-[#0077b6] transition"
          >
            <User className="h-4 w-4" />
            Iniciar sesión
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-2 bg-white rounded-b-xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="text-left text-sm py-2 border-b border-gray-100 text-gray-700"
            >
              {item.label}
            </button>
          ))}

          <button 
            onClick={onReserva}
            className="mt-2 w-full py-2 rounded-full bg-[#0096c7] text-white text-sm">
            Reservar hora
          </button>

          <button
            onClick={onLogin}
            className="w-full py-2 text-sm text-[#0077b6] font-medium"
          >
            Iniciar sesión
          </button>
        </div>
      )}
    </header>
  );
}