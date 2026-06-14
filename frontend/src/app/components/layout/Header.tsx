import {
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import logoFull from '@/app/assets/logo-sf-1.svg';

interface HeaderProps {
  onAgenda?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export function Header({
  onAgenda,
  onProfile,
  onSettings,
  onLogout,
  onToggleSidebar,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm' 
          : 'bg-white border-slate-100'
      }`}
    >
      <div className="flex h-16 md:h-20 items-center justify-between px-6 max-w-[2000px] mx-auto">

        {/* LEFT SECTION: Hamburguesa + Logo */}
        <div className="flex items-center gap-4">
          {/* Menú Móvil */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#00a7b1] transition-all duration-200"
            title="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Contenedor del Logo RedNorte */}
          <div className="flex items-center select-none cursor-pointer transition-transform duration-200 active:scale-95">
            <img src={logoFull} alt="RedNorte" className="h-9 md:h-11 w-auto object-contain" />
          </div>
        </div>

        {/* CENTER ACTIONS: Barra de Navegación Estilo Cápsula */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/40">
          {[
            { label: 'Agenda', icon: Calendar, onClick: onAgenda },
            { label: 'Mi Perfil', icon: User, onClick: onProfile },
            { label: 'Ajustes', icon: Settings, onClick: onSettings },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold text-slate-600 hover:bg-white hover:text-[#004a87] hover:shadow-sm transition-all duration-200"
            >
              <item.icon className="h-4 w-4 stroke-[2.25]" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SECTION: Perfil del Sistema / Acciones Rápidas */}
        <div className="flex items-center gap-4">
          <div className="h-6 w-[1px] bg-slate-200 hidden lg:block" />
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50/60 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 stroke-[2.25]" />
            <span className="hidden md:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
}