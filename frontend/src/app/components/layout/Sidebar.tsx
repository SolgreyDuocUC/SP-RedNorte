import {
  Calendar,
  Clock,
  Home,
  Hospital,
  LayoutDashboard,
  Users,
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
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-white transition-transform duration-200',
        !isOpen && '-translate-x-full md:translate-x-0'
      )}
    >
      <nav className="flex h-full flex-col gap-2 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
