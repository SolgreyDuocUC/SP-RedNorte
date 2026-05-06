import { 
  Calendar, 
  User, 
  FileText, 
  Clock, 
  ChevronRight, 
  Activity,
  History,
  Stethoscope
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  mockPatients, 
  mockAppointments, 
  mockClinicalHistory 
} from '../../../mocks/mockData';
import { Appointment, Patient, ClinicalHistoryEntry } from '../../../types/clinical';

export function DashboardDoctor() {
  const drId = 'dr1'; // Roberto Farías
  const today = '2026-05-02';
  const myAgenda = mockAppointments.filter((a: Appointment) => a.medicoId === drId && a.fecha === today);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#004a87]">Dashboard Médico</h2>
          <p className="text-sm text-slate-500">Bienvenido, Dr. Roberto Farías</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-[#004a87]" />
          </div>
          <div className="pr-4">
            <p className="text-xs font-bold text-slate-800">En Turno</p>
            <p className="text-[10px] text-emerald-600 font-bold">Disponible</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Agenda de Atención */}
        <Card className="lg:col-span-2 shadow-lg border-none overflow-hidden">
          <CardHeader className="bg-white border-b py-5">
            <CardTitle className="text-lg font-bold text-[#004a87] flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#00a7b1]" /> Agenda de Pacientes - Hoy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Hora</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myAgenda.map((a: Appointment) => {
                    const pac = mockPatients.find((p: Patient) => p.id === a.pacienteId);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-lg bg-[#00a7b1]/10 text-[#00a7b1] flex items-center justify-center font-bold text-xs">
                               {pac?.nombre.charAt(0)}
                             </div>
                             <div>
                               <p className="text-sm font-bold text-slate-800">{pac?.nombre}</p>
                               <p className="text-[11px] text-slate-500">{pac?.run}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                            <Clock className="h-3.5 w-3.5 text-[#00a7b1]" /> {a.hora}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] font-bold ${
                              a.estado === 'Atendido' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              a.estado === 'En espera' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}
                          >
                            {a.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-xs font-bold text-[#004a87] hover:underline flex items-center gap-1 ml-auto">
                            Atender <ChevronRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Historial Reciente / Acceso Rápido */}
        <div className="space-y-6">
          <Card className="shadow-md border-none">
            <CardHeader className="border-b">
              <CardTitle className="text-sm font-bold text-[#004a87] flex items-center gap-2">
                <History className="h-4 w-4 text-[#00a7b1]" /> Historial Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {mockClinicalHistory.slice(0, 3).map((h: ClinicalHistoryEntry) => {
                  const pac = mockPatients.find((p: Patient) => p.id === h.pacienteId);
                  return (
                    <div key={h.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-bold text-slate-800">{pac?.nombre}</p>
                        <span className="text-[9px] text-slate-400 font-medium">{h.fecha}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2 italic">
                        "{h.diagnostico}: {h.observaciones}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#004a87] text-white shadow-lg border-none overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
               <Stethoscope className="h-24 w-24" />
            </div>
            <CardContent className="pt-6 relative z-10">
              <h3 className="font-bold text-sm mb-2">Teleconsulta Pendiente</h3>
              <p className="text-[10px] text-blue-200 mb-4 leading-relaxed">
                Tiene una solicitud de interconsulta pendiente para revisión.
              </p>
              <button className="w-full bg-[#00a7b1] hover:bg-[#00c2ce] py-2 rounded-lg text-xs font-bold transition-all">
                Abrir Telemedicina
              </button>
            </CardContent>
          </Card>

          <button className="w-full bg-white border-2 border-[#004a87] text-[#004a87] hover:bg-[#f0f9ff] py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            <FileText className="h-4 w-4" /> Emitir Receta/Licencia
          </button>
        </div>
      </div>
    </div>
  );
}
