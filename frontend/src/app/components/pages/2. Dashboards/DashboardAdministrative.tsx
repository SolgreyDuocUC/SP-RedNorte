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
import { useState, useEffect } from 'react';
import { AppointmentDTO } from '../../../../remotes/dtos/appointment.dto';
import { PatientDTO } from '../../../../remotes/dtos/patient.dto';
import { patientRemote } from '../../../../remotes/patient.remote';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';

export function DashboardAdministrative() {
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsData, appointmentsData] = await Promise.all([
          patientRemote.getAll(),
          appointmentsRemote.getAll()
        ]);
        setPatients(patientsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const today = new Date().toISOString().split('T')[0]; // Current date YYYY-MM-DD
  const dailyAgenda = appointments.filter((a) => a.start && new Date(a.start).toISOString().split('T')[0] === today);
  const canceledCount = dailyAgenda.filter((a) => a.status === 'cancelled').length;

  const filteredPatients = patients.filter(p => 
    `${p.firstName || ''} ${p.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.identifierValue && p.identifierValue.includes(searchTerm))
  ).slice(0, 3);

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
                  {dailyAgenda.map((a: AppointmentDTO) => {
                    const pac = patients.find((p) => p.id === a.patientId);
                    const patientName = pac ? `${pac.firstName || ''} ${pac.lastName || ''}`.trim() || 'Paciente Desconocido' : 'Paciente Desconocido';
                    const patientRun = pac?.identifierValue || 'Sin RUN';
                    
                    // Format time
                    const timeString = a.start ? new Date(a.start).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : '--:--';
                    
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{patientName}</p>
                          <p className="text-[11px] text-slate-500 italic">{patientRun}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                            <Clock className="h-3.5 w-3.5 text-[#00a7b1]" /> {timeString}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{a.specialty}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary" 
                            className={`text-[10px] font-bold ${
                              a.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                              a.status === 'fulfilled' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {a.status === 'booked' ? 'Agendado' : a.status === 'cancelled' ? 'Cancelado' : a.status === 'fulfilled' ? 'Atendido' : a.status}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="RUT o Nombre..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                {filteredPatients.map((p: PatientDTO) => {
                  const patientName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Paciente Desconocido';
                  const patientRun = p.identifierValue || 'Sin RUN';
                  return (
                  <div key={p.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{patientName}</p>
                      <p className="text-[10px] text-slate-500">{patientRun}</p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                  </div>
                )})}
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
                  <p className="text-[10px] text-blue-200">0 Pacientes pendientes</p>
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
