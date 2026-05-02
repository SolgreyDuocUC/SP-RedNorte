import { 
  Users, 
  Calendar, 
  XSquare, 
  RefreshCw, 
  Building2, 
  Stethoscope 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { 
  mockPatients, 
  mockAppointments, 
  mockFacilities, 
  mockProfessionals 
} from '../../../mocks/mockData';
import { Appointment, Facility, Professional } from '../../../types/clinical';

export function DashboardAdmin() {
  const stats = {
    totalPatients: mockPatients.length,
    totalAppointments: mockAppointments.length,
    cancellations: mockAppointments.filter((a: Appointment) => a.estado === 'Cancelado').length,
    reassignments: 4, // Simulated KPI
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#004a87]">Dashboard Administrador</h2>
      
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Total Pacientes</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.totalPatients}</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Citas Vigentes</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.totalAppointments}</h3>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Cancelaciones</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.cancellations}</h3>
              </div>
              <XSquare className="h-8 w-8 text-red-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Reasignaciones</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.reassignments}</h3>
              </div>
              <RefreshCw className="h-8 w-8 text-amber-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lista de Centros */}
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#00a7b1]" /> Centros de Atención
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              {mockFacilities.map((f: Facility) => (
                <li key={f.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="text-sm font-bold text-slate-800">{f.nombre}</p>
                  <p className="text-xs text-slate-500">{f.comuna} · {f.tipo}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Lista de Profesionales */}
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-[#00a7b1]" /> Profesionales del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="divide-y divide-slate-100">
                {mockProfessionals.map((p: Professional) => (
                  <li key={p.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-sm font-bold text-slate-800">{p.nombre}</p>
                    <p className="text-xs text-slate-500">{p.especialidad} · {p.establecimiento}</p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
