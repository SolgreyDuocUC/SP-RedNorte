import {
  Clock,
  AlertCircle,
  ChevronRight,
  ClipboardList,
  Stethoscope
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useState, useEffect } from 'react';
import { AppointmentDTO } from '../../../../remotes/dtos/appointment.dto';
import { PatientDTO } from '../../../../remotes/dtos/patient.dto';
import { patientRemote } from '../../../../remotes/patient.remote';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';

const priorityInfo = (priority?: number) => {
  if (priority === 3) return { label: 'alta', color: 'bg-red-500 text-white', border: 'border-l-4 border-l-red-500' };
  if (priority === 2) return { label: 'media', color: 'bg-amber-400 text-white', border: 'border-l-4 border-l-amber-400' };
  return { label: 'baja', color: 'bg-emerald-500 text-white', border: 'border-l-4 border-l-emerald-500' };
};

export function DashboardNurse() {
  const [waitlist, setWaitlist] = useState<AppointmentDTO[]>([]);
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [waitlistData, patientsData] = await Promise.all([
          appointmentsRemote.getWaitlist(),
          patientRemote.getAll(),
        ]);
        setWaitlist(waitlistData);
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching nurse dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const highCount = waitlist.filter(a => a.priority === 3).length;
  const mediumCount = waitlist.filter(a => a.priority === 2).length;
  const lowCount = waitlist.filter(a => !a.priority || a.priority === 1).length;
  const criticalEntry = waitlist.find(a => a.priority === 3);
  const criticalPatient = criticalEntry ? patients.find(p => p.id === criticalEntry.patientId) : undefined;
  const criticalPatientName = criticalPatient
    ? `${criticalPatient.firstName || ''} ${criticalPatient.lastName || ''}`.trim() || 'Paciente'
    : '';

  const goToWaitingList = () => {
    const event = new CustomEvent('navigate', { detail: 'waiting-list' });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#004a87]">Dashboard Enfermería (Triage)</h2>
          <p className="text-sm text-slate-500">Gestión de flujo y priorización de pacientes</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-red-100 text-red-700 border-red-200">{highCount} Alta Prioridad</Badge>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">{mediumCount} Media</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{lowCount} Baja</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista de Triage / Espera */}
        <Card className="lg:col-span-2 shadow-lg border-none overflow-hidden">
          <CardHeader className="bg-white border-b py-5">
            <CardTitle className="text-lg font-bold text-[#004a87] flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#00a7b1]" /> Pacientes en Espera de Categorización / Atención
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {waitlist.map((entry) => {
                const pac = patients.find((p) => p.id === entry.patientId);
                const patientName = pac ? `${pac.firstName || ''} ${pac.lastName || ''}`.trim() || 'Paciente Desconocido' : 'Paciente Desconocido';
                const info = priorityInfo(entry.priority);
                return (
                  <div key={entry.id} className={`p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group ${info.border}`}>
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${info.color}`}>
                        {info.label.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{patientName}</p>
                        <p className="text-[11px] text-slate-500">{pac?.identifierValue || 'Sin RUN'} · {entry.specialty}</p>
                      </div>
                    </div>
                    <button className="bg-slate-100 hover:bg-[#004a87] hover:text-white p-2 rounded-lg transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
              {!loading && waitlist.length === 0 && (
                <div className="p-8 text-center text-sm text-slate-400">
                  No hay pacientes en lista de espera actualmente.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Panel Lateral: Alertas */}
        <div className="space-y-6">
          <Card className={`shadow-lg border-none text-white ${criticalEntry ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-white/80" />
                <div>
                  <h3 className="font-bold text-sm">Alertas Médicas</h3>
                  <p className="text-[10px] text-white/80">
                    {criticalEntry ? '1 Paciente crítico en lista de espera' : 'Sin alertas críticas activas'}
                  </p>
                </div>
              </div>
              {criticalEntry && (
                <div className="bg-white/10 p-3 rounded-lg text-xs leading-relaxed italic">
                  "{criticalPatientName} requiere atención prioritaria ({criticalEntry.specialty})."
                </div>
              )}
            </CardContent>
          </Card>

          <button
            onClick={goToWaitingList}
            className="w-full flex items-center justify-center gap-2 bg-[#004a87] hover:bg-[#003561] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <Stethoscope className="h-4 w-4" /> Categorizar Paciente
          </button>
        </div>
      </div>
    </div>
  );
}
