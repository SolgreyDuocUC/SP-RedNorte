import {
  Calendar,
  Clock,
  Hospital,
  LayoutDashboard,
  FileText,
  Bell,
  Activity,
  Settings,
  Users,
  CalendarPlus,
} from 'lucide-react';
import { cn } from '../ui/utils';
import type { AppRole } from '../pages/1. Login/Login';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen?: boolean;
  role: AppRole;
}

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  disabled?: boolean;
  roles: AppRole[]; // roles que pueden ver este item
}

interface NavGroup {
  title: string;
  items: NavItem[];
  roles: AppRole[]; // roles que pueden ver este grupo
}

const ALL_ROLES: AppRole[] = ['admin', 'administrativo', 'enfermeria', 'medico', 'paciente'];

const navigationGroups: NavGroup[] = [
  {
    title: 'Panel Clínico',
    roles: ALL_ROLES,
    items: [
      { id: 'dashboard', label: 'Resumen Clínico', icon: LayoutDashboard, roles: ALL_ROLES },
    ],
  },
  {
    title: 'Atención del Paciente',
    roles: ['admin', 'administrativo', 'enfermeria', 'medico'],
    items: [
      { id: 'appointments', label: 'Citas Médicas', icon: Calendar, roles: ['admin', 'administrativo', 'enfermeria', 'medico'] },
      { id: 'history', label: 'Historial Clínico', icon: FileText, roles: ['admin', 'medico', 'enfermeria'] },
    ],
  },
  {
    title: 'Gestión Crítica',
    roles: ['admin', 'administrativo', 'enfermeria', 'medico'],
    items: [
      { id: 'waiting-list', label: 'Lista de Espera', icon: Clock, roles: ['admin', 'administrativo', 'enfermeria'] },
      { id: 'notifications', label: 'Alertas Clínicas', icon: Bell, roles: ['admin', 'administrativo', 'enfermeria', 'medico'] },
    ],
  },
  {
    title: 'Reserva de Horas',
    roles: ['paciente'],
    items: [
      { id: 'reserva', label: 'Reservar Hora', icon: CalendarPlus, roles: ['paciente'] },
    ],
  },
  {
    title: 'Administración',
    roles: ['admin'],
    items: [
      { id: 'facilities', label: 'Establecimientos', icon: Hospital, roles: ['admin'] },
      { id: 'admin-users', label: 'Colaboradores', icon: Users, roles: ['admin'] },
      { id: 'reports', label: 'Indicadores', icon: Activity, disabled: true, roles: ['admin'] },
      { id: 'settings', label: 'Configuración', icon: Settings, disabled: true, roles: ['admin'] },
    ],
  },
];

// Info del usuario mock por rol
const MOCK_USER_INFO: Record<AppRole, { name: string; initials: string }> = {
  admin:          { name: 'Admin Demo',          initials: 'AD' },
  administrativo: { name: 'Administrativo Demo', initials: 'AM' },
  enfermeria:     { name: 'Enfermería Demo',     initials: 'EN' },
  medico:         { name: 'Médico Demo',         initials: 'MD' },
  paciente:       { name: 'Paciente Demo',       initials: 'PA' },
};

const ROLE_LABELS: Record<AppRole, string> = {
  admin: 'Administrador',
  administrativo: 'Administrativo',
  enfermeria: 'Enfermería',
  medico: 'Médico',
  paciente: 'Paciente',
};

export function Sidebar({ activeView, onViewChange, isOpen = false, role }: SidebarProps) {
  const userInfo = MOCK_USER_INFO[role];

  // Filtrar grupos e items visibles para el rol actual
  const visibleGroups = navigationGroups
    .filter((group) => group.roles.includes(role))
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        'fixed left-0.5 top-16 md:top-20 bottom-2 z-40 w-64 border-r border-border bg-white flex flex-col rounded-r-xl transition-transform duration-200',
        !isOpen && '-translate-x-full md:translate-x-0'
      )}
    >
      {/* NAV */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {visibleGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                const isDisabled = item.disabled;

                return (
                  <button
                    key={item.id}
                    disabled={isDisabled} 
                    onClick={() => !isDisabled && onViewChange(item.id)}
                    className={cn(
                      'relative flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                      isDisabled
                        ? 'opacity-40 cursor-not-allowed bg-slate-50/50 text-slate-400'
                        : isActive
                        ? 'bg-[#e6f4f9] text-[#023e8a]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#023e8a]'
                    )}
                  >
                    {isActive && !isDisabled && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#0096c7]" />
                    )}

                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        isDisabled ? 'text-slate-300' : isActive ? 'text-[#0096c7]' : 'text-slate-400'
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

      {/* FOOTER CARD */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg bg-[#f1f9fc] px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0096c7] to-[#023e8a] text-white text-xs font-bold">
            {userInfo.initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#023e8a] truncate">
              {userInfo.name}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {ROLE_LABELS[role]}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}