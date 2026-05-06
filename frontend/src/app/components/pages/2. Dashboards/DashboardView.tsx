import { 
  Users, 
  Stethoscope, 
  Clock, 
  AlertTriangle, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  ChevronRight, 
  Activity,
  UserCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useState } from 'react';
import { DashboardAdmin } from './DashboardAdmin';
import { DashboardAdministrative } from './DashboardAdministrative';
import { DashboardDoctor } from './DashboardDoctor';
import { DashboardNurse } from './DashboardNurse';

type UserRole = 'ADMIN' | 'ADMINISTRATIVO' | 'ENFERMERO' | 'MEDICO';

export function DashboardView({ onNewBooking }: { onNewBooking?: () => void }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');

  const renderDashboardByRole = () => {
    switch (currentRole) {
      case 'ADMIN':
        return <DashboardAdmin />;
      case 'ADMINISTRATIVO':
        return <DashboardAdministrative />;
      case 'ENFERMERO':
        return <DashboardNurse />;
      case 'MEDICO':
        return <DashboardDoctor />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <div className="mt-[104px] md:mt-[88px] min-h-screen bg-[#f8fafc] p-4 md:p-8 space-y-8 font-sans">
      
      {/* ROLE SWITCHER (Solo para demostración de arquitectura) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#004a87]/10 flex items-center justify-center">
            <UserCircle className="h-6 w-6 text-[#004a87]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Simulación de Rol</p>
            <p className="text-sm font-bold text-[#004a87]">{currentRole}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['ADMIN', 'ADMINISTRATIVO', 'ENFERMERO', 'MEDICO'] as UserRole[]).map((role) => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                currentRole === role 
                ? 'bg-[#004a87] text-white shadow-md' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* HEADER DE BIENVENIDA Y ACCIONES RÁPIDAS (RF16, RF19) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[#004a87] tracking-tight">RedNorte Clínica</h2>
          <p className="text-slate-500 text-sm mt-1">
            <span className="font-semibold text-[#00a7b1]">Sede Iquique</span> · {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
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