import { 
  Calendar, 
  Users, 
  UserPlus, 
  XCircle, 
  ListOrdered, 
  Search, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  mockPatients, 
  mockAppointments, 
  mockWaitingList 
} from '../../../mocks/mockData';
import { Appointment, Patient } from '../../../types/clinical';

export function DashboardAdministrative() {
  const today = '2026-05-02';
  const dailyAgenda = mockAppointments.filter((a: Appointment) => a.fecha === today);
  const canceledCount = dailyAgenda.filter((a: Appointment) => a.estado === 'Cancelado').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#004a87]">Dashboard Administrativo</h2>
        <button className="flex items-center gap-2 bg-[#00a7b1] hover:bg-[#008d96] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all">
          <UserPlus className="h-4 w-4" /> Registrar Nuevo Paciente
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Agenda del Día */}
        <Card className="lg:col-span-2 shadow-lg border-none overflow-hidden">
          <CardHeader className="bg-white border-b flex flex-row items-center justify-between py-5">
            <div>
              <CardTitle className="text-lg font-bold text-[#004a87]">Agenda del Día ({today})</CardTitle>
              <p className="text-xs text-slate-500 mt-1">Pacientes citados para hoy</p>
            </div>
            {canceledCount > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                <XCircle className="h-3 w-3 mr-1" /> {canceledCount} Canceladas
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Hora</th>
                    <th className="px-6 py-4">Especialidad</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dailyAgenda.map((a: Appointment) => {
                    const pac = mockPatients.find((p: Patient) => p.id === a.pacienteId);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{pac?.nombre}</p>
                          <p className="text-[11px] text-slate-500 italic">{pac?.run}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                            <Clock className="h-3.5 w-3.5 text-[#00a7b1]" /> {a.hora}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{a.especialidad}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary" 
                            className={`text-[10px] font-bold ${
                              a.estado === 'Cancelado' ? 'bg-red-100 text-red-700' : 
                              a.estado === 'Atendido' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {a.estado}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Panel Lateral: Pacientes y Lista de Espera */}
        <div className="space-y-6">
          <Card className="shadow-md border-none">
            <CardHeader>
              <CardTitle className="text-base font-bold text-[#004a87] flex items-center gap-2">
                <Users className="h-4 w-4" /> Búsqueda Pacientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="RUT o Nombre..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                {mockPatients.slice(0, 3).map((p: Patient) => (
                  <div key={p.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{p.nombre}</p>
                      <p className="text-[10px] text-slate-500">{p.run}</p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#004a87] text-white shadow-lg border-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ListOrdered className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Lista de Espera</h3>
                  <p className="text-[10px] text-blue-200">{mockWaitingList.length} Pacientes pendientes</p>
                </div>
              </div>
              <button className="w-full bg-[#00a7b1] hover:bg-[#00c2ce] py-2.5 rounded-lg text-xs font-bold transition-all shadow-md">
                Ver Lista de Espera Completa
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
