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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 border-b border-gray-100/80 ${
        scrolled ? 'shadow-sm py-1' : 'py-3'
      }`}
    >
      {/* MAIN HEADER */}
      <div className="flex h-16 items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full">

        {/* LOGO */}
        <div className="flex items-center select-none flex-shrink-0">
          <img src={logoFull} alt="Red Norte" className="h-10 w-auto" />
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 justify-center flex-1 mx-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 py-1 text-gray-500 hover:text-black transition cursor-pointer"
            >
              {item.label}
              {item.dropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
            </button>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onLogin}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-black text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            Ingresar
          </button>

          <button
            onClick={onReserva}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black border border-black hover:bg-neutral-50 transition cursor-pointer"
          >
            Reservar una hora
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