import {
  Building2,
  Users,
  Stethoscope,
  ListOrdered,
  LifeBuoy,
  Activity,
  CalendarCheck,
  Ban,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { usersRemote } from '../../../../remotes/users.remote';
import { facilitiesRemote } from '../../../../remotes/facilities.remote';
import { specialtiesRemote } from '../../../../remotes/specialties.remote';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';

interface AdminDashboardViewProps {
  onNavigate: (view: string) => void;
}

export function AdminDashboardView({ onNavigate }: AdminDashboardViewProps) {
  const [counts, setCounts] = useState({ collaborators: 0, facilities: 0, specialties: 0, waitlist: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, facilities, specialties, waitlist] = await Promise.all([
          usersRemote.getAll(),
          facilitiesRemote.getAll(),
          specialtiesRemote.getAll(),
          appointmentsRemote.getWaitlist(),
        ]);
        setCounts({
          collaborators: users.length,
          facilities: facilities.length,
          specialties: specialties.length,
          waitlist: waitlist.length,
        });
      } catch (error) {
        console.error('Error fetching admin dashboard metrics:', error);
      }
    };
    fetchData();
  }, []);

  const metrics = [
    { label: 'TOTAL COLABORADORES', value: String(counts.collaborators), icon: Users, color: 'bg-blue-50 text-blue-600', border: 'border-l-4 border-blue-500' },
    { label: 'CENTROS ACTIVOS', value: String(counts.facilities), icon: Building2, color: 'bg-green-50 text-green-600', border: 'border-l-4 border-green-500' },
    { label: 'ESPECIALIDADES', value: String(counts.specialties), icon: Stethoscope, color: 'bg-purple-50 text-purple-600', border: 'border-l-4 border-purple-500' },
    { label: 'PACIENTES EN LISTA DE ESPERA', value: String(counts.waitlist), icon: ListOrdered, color: 'bg-amber-50 text-amber-600', border: 'border-l-4 border-amber-500' },
  ];

  const modules = [
    {
      id: 'admin-facilities',
      title: 'Centros de Atención',
      description: 'Gestión de hospitales, clínicas y establecimientos.',
      icon: Building2,
      color: 'from-[#0096c7] to-[#023e8a]'
    },
    {
      id: 'admin-users',
      title: 'Colaboradores y Accesos',
      description: 'Administración de personal médico y administrativo.',
      icon: Users,
      color: 'from-emerald-400 to-teal-600'
    },
    {
      id: 'admin-specialties',
      title: 'Áreas y Especialidades',
      description: 'Configuración de servicios médicos disponibles.',
      icon: Stethoscope,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'admin-support',
      title: 'Mesa de Soporte',
      description: 'Resolución de problemas y tickets de contraseñas.',
      icon: LifeBuoy,
      color: 'from-amber-400 to-orange-500'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-[#023e8a] flex items-center gap-3">
          <Activity className="h-8 w-8 text-[#0096c7]" />
          Dashboard Administrador
        </h2>
        <p className="text-slate-500">Resumen global de la plataforma y accesos rápidos a módulos de gestión.</p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className={`border-0 shadow-sm ring-1 ring-slate-100 ${m.border} overflow-hidden bg-white`}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">{m.value}</h3>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${m.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modules Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-700 mb-4">Módulos de Administración</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map(mod => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className="group relative flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-[#0096c7]/50 transition-all text-left overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${mod.color}`} />
                
                <div className="flex items-center justify-between w-full mb-4 pl-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} text-white shadow-sm`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors text-slate-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="pl-3">
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-[#023e8a] transition-colors">{mod.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{mod.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
