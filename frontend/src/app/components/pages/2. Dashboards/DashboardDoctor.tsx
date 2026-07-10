import {
  Calendar,
  User,
  Clock,
  ChevronRight,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useState, useEffect } from 'react';
import { AppointmentDTO } from '../../../../remotes/dtos/appointment.dto';
import { PatientDTO } from '../../../../remotes/dtos/patient.dto';
import { patientRemote } from '../../../../remotes/patient.remote';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';
import { practitionerRemote, PractitionerDTO } from '../../../../remotes/practitioner.remote';
import { clinicalHistoryRemote, ClinicalNoteDTO } from '../../../../remotes/clinical-history.remote';

const statusLabel = (status: string) => {
  switch (status) {
    case 'fulfilled': return 'Atendido';
    case 'cancelled': return 'Cancelado';
    case 'noshow': return 'No se presentó';
    case 'waitlist': return 'En espera';
    default: return 'Agendado';
  }
};

const statusClasses = (status: string) => {
  switch (status) {
    case 'fulfilled': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
    case 'waitlist': return 'bg-amber-50 text-amber-600 border-amber-100';
    default: return 'bg-blue-50 text-blue-600 border-blue-100';
  }
};

interface RecentNote extends ClinicalNoteDTO {
  patientName: string;
}

export function DashboardDoctor() {
  const [practitioner, setPractitioner] = useState<PractitionerDTO | null>(null);
  const [agenda, setAgenda] = useState<AppointmentDTO[]>([]);
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [recentNotes, setRecentNotes] = useState<RecentNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const run = localStorage.getItem('run') || '';
        const [prac, patientsData] = await Promise.all([
          practitionerRemote.getByRun(run),
          patientRemote.getAll(),
        ]);
        setPractitioner(prac);
        setPatients(patientsData);

        const appointments = await appointmentsRemote.getByPractitioner(String(prac.practitionerId));
        const today = new Date().toISOString().split('T')[0];
        const todayAgenda = appointments.filter(a => a.start && new Date(a.start).toISOString().split('T')[0] === today);
        setAgenda(todayAgenda);

        const patientIds = [...new Set(todayAgenda.map(a => a.patientId))].slice(0, 5);
        const histories = await Promise.all(
          patientIds.map(id => clinicalHistoryRemote.getByPatient(id).catch(() => null))
        );
        const notes: RecentNote[] = histories
          .flatMap((h, idx) => (h?.clinicalNotes || []).map(n => ({
            ...n,
            patientName: patientsData.find(p => p.id === patientIds[idx])
              ? `${patientsData.find(p => p.id === patientIds[idx])!.firstName || ''} ${patientsData.find(p => p.id === patientIds[idx])!.lastName || ''}`.trim()
              : 'Paciente',
          })))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        setRecentNotes(notes);
      } catch (error) {
        console.error('Error fetching doctor dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const practitionerName = practitioner
    ? `Dr(a). ${practitioner.firstNamePractitioner} ${practitioner.lastNamePractitioner}`.trim()
    : loading ? 'Cargando...' : 'Médico';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#004a87]">Dashboard Médico</h2>
          <p className="text-sm text-slate-500">Bienvenido, {practitionerName}</p>
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
                  {agenda.map((a: AppointmentDTO) => {
                    const pac = patients.find((p) => p.id === a.patientId);
                    const patientName = pac ? `${pac.firstName || ''} ${pac.lastName || ''}`.trim() || 'Paciente Desconocido' : 'Paciente Desconocido';
                    const timeString = a.start ? new Date(a.start).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : '--:--';
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-lg bg-[#00a7b1]/10 text-[#00a7b1] flex items-center justify-center font-bold text-xs">
                               {patientName.charAt(0)}
                             </div>
                             <div>
                               <p className="text-sm font-bold text-slate-800">{patientName}</p>
                               <p className="text-[11px] text-slate-500">{pac?.identifierValue || 'Sin RUN'}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                            <Clock className="h-3.5 w-3.5 text-[#00a7b1]" /> {timeString}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`text-[10px] font-bold ${statusClasses(a.status)}`}>
                            {statusLabel(a.status)}
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
                  {!loading && agenda.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-400">
                        No hay pacientes agendados para hoy.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Historial Reciente */}
        <div className="space-y-6">
          <Card className="shadow-md border-none">
            <CardHeader className="border-b">
              <CardTitle className="text-sm font-bold text-[#004a87] flex items-center gap-2">
                <History className="h-4 w-4 text-[#00a7b1]" /> Historial Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {recentNotes.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-bold text-slate-800">{n.patientName}</p>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {new Date(n.createdAt).toLocaleDateString('es-CL')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 italic">"{n.content}"</p>
                  </div>
                ))}
                {!loading && recentNotes.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-400">
                    Sin notas clínicas recientes para los pacientes de hoy.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
