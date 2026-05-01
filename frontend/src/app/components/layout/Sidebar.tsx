import {
  Calendar,
  Clock,
  Hospital,
  LayoutDashboard,
  FileText,
  Bell,
  Activity,
  Settings,
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen?: boolean;
}

const navigationGroups = [
  {
    title: 'Panel Clínico',
    items: [
      { id: 'dashboard', label: 'Resumen Clínico', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Atención del Paciente',
    items: [
      { id: 'appointments', label: 'Citas Médicas', icon: Calendar },
      { id: 'history', label: 'Historial Clínico', icon: FileText },
    ],
  },
  {
    title: 'Gestión Crítica',
    items: [
      { id: 'waiting-list', label: 'Lista de Espera', icon: Clock },
      { id: 'notifications', label: 'Alertas Clínicas', icon: Bell },
    ],
  },
  {
    title: 'Administración',
    items: [
      { id: 'facilities', label: 'Establecimientos', icon: Hospital },
      { id: 'reports', label: 'Indicadores', icon: Activity },
      { id: 'settings', label: 'Configuración', icon: Settings },
    ],
  },
];

export function Sidebar({ activeView, onViewChange, isOpen = true }: SidebarProps) {
  return (
    <aside
      className={cn(
        // 👇 más aire abajo (bottom-2 + padding visual)
        'fixed left-0.5 top-20 bottom-2 z-40 w-64 border-r border-border bg-white flex flex-col rounded-r-xl transition-transform duration-200',
        !isOpen && '-translate-x-full md:translate-x-0'
      )}
    >
      {/* NAV */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">

        {navigationGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      'relative flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-[#e6f4f9] text-[#023e8a]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#023e8a]'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#0096c7]" />
                    )}

                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        isActive ? 'text-[#0096c7]' : 'text-slate-400'
                      )}
                    />

                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER CARD (sin "Paciente") */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg bg-[#f1f9fc] px-3 py-2.5">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0096c7] to-[#023e8a] text-white text-xs font-bold">
            JP
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#023e8a] truncate">
              Juan Pérez
            </p>

            {/* ❌ quitado “Paciente” */}
            <p className="text-[11px] text-slate-500 truncate">
              Activo
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}