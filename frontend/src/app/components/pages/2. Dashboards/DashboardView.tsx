import { 
  Search, 
  Plus, 
} from 'lucide-react';
import { DashboardAdmin } from './DashboardAdmin';
import { DashboardAdministrative } from './DashboardAdministrative';
import { DashboardDoctor } from './DashboardDoctor';
import { DashboardNurse } from './DashboardNurse';
import type { AppRole } from '../1. Login/Login';

interface DashboardViewProps {
  role: AppRole;
  onNewBooking?: () => void;
}

// Mapa de nombre legible por rol
const ROLE_LABELS: Record<AppRole, string> = {
  admin: 'Administrador',
  administrativo: 'Administrativo',
  enfermeria: 'Enfermería',
  medico: 'Médico',
  paciente: 'Paciente',
};

export function DashboardView({ role, onNewBooking }: DashboardViewProps) {

  const renderDashboardByRole = () => {
    switch (role) {
      case 'admin':
        return <DashboardAdmin />;
      case 'administrativo':
        return <DashboardAdministrative />;
      case 'enfermeria':
        return <DashboardNurse />;
      case 'medico':
        return <DashboardDoctor />;
      case 'paciente':
        // Por ahora, paciente ve el dashboard administrativo (se puede crear uno propio)
        return <DashboardAdministrative />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <div className="mt-[104px] md:mt-[88px] min-h-screen bg-[#f8fafc] p-4 md:p-8 space-y-8 font-sans">

      {/* HEADER DE BIENVENIDA Y ACCIONES RÁPIDAS (RF16, RF19) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[#004a87] tracking-tight">RedNorte Clínica</h2>
          <p className="text-slate-500 text-sm mt-1">
            <span className="font-semibold text-[#00a7b1]">Sede Iquique</span> · {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
            <span className="ml-2 inline-flex items-center gap-1.5 bg-[#e6f4f9] text-[#004a87] text-xs font-bold px-3 py-1 rounded-full">
              {ROLE_LABELS[role]}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#00a7b1] transition-colors" />
            <input
              type="text"
              placeholder="Búsqueda rápida..."
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm w-full md:w-64 focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none shadow-sm transition-all"
            />
          </div>
          <button onClick={onNewBooking} className="flex items-center gap-2 bg-[#004a87] hover:bg-[#003561] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all">
            <Plus className="h-4 w-4" /> Nueva Atención
          </button>
        </div>
      </div>

      {/* RENDERIZADO DEL DASHBOARD ESPECÍFICO POR ROL */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {renderDashboardByRole()}
      </div>

    </div>
  );
}