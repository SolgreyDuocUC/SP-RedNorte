import {
  Calendar,
  Clock,
  Hospital,
  LayoutDashboard,
  FileText,
  Bell,
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen?: boolean;
}

const navigationItems = [
  { id: 'dashboard', label: 'Panel Principal', icon: LayoutDashboard },
  { id: 'appointments', label: 'Mis Citas', icon: Calendar },
  { id: 'waiting-list', label: 'Lista de Espera', icon: Clock },
  { id: 'facilities', label: 'Establecimientos', icon: Hospital },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
  { id: 'history', label: 'Historial Médico', icon: FileText },
];

export function Sidebar({ activeView, onViewChange, isOpen = true }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-white transition-transform duration-200 flex flex-col',
        !isOpen && '-translate-x-full md:translate-x-0'
      )}
    >
      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-secondary text-[#023e8a]'
                  : 'text-slate-600 hover:bg-muted hover:text-[#023e8a]'
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary" />
              )}
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
                )}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom patient card */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096c7] to-[#023e8a] text-white text-xs font-bold">
            JP
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#023e8a] truncate">Juan Pérez</p>
            <p className="text-[11px] text-slate-500 truncate">Paciente</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
