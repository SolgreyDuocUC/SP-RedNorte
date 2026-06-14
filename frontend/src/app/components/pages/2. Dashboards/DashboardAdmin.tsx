import { 
  Users, 
  Calendar, 
  XSquare, 
  RefreshCw, 
  Building2, 
  Stethoscope 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useState, useEffect } from 'react'
import { FacilityDTO } from '../../../../remotes/facilities.remote';
import { patientRemote } from '../../../../remotes/patient.remote';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';
import { facilitiesRemote } from '../../../../remotes/facilities.remote';

export function DashboardAdmin() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [cancellationsCount, setCancellationsCount] = useState(0);
  const [facilities, setFacilities] = useState<FacilityDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsData, appointmentsData, facilitiesData] = await Promise.all([
          patientRemote.getAll(),
          appointmentsRemote.getAll(),
          facilitiesRemote.getAll()
        ]);
        setPatientsCount(patientsData.length);
        setAppointmentsCount(appointmentsData.length);
        setCancellationsCount(appointmentsData.filter(a => a.status === 'cancelled').length);
        setFacilities(facilitiesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const stats = {
    totalPatients: patientsCount,
    totalAppointments: appointmentsCount,
    cancellations: cancellationsCount,
    reassignments: 4,
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
              {facilities.map((f: FacilityDTO) => (
                <li key={f.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="text-sm font-bold text-slate-800">{f.name}</p>
                  <p className="text-xs text-slate-500">Centro Médico · {f.status}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Acceso a Profesionales */}
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-[#00a7b1]" /> Profesionales del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <Users className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">Gestión de Colaboradores</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm">
              Desde aquí puedes crear, editar, eliminar profesionales médicos y asignarles sus horarios de atención en cada sede.
            </p>
            <button 
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'admin-users' });
                window.dispatchEvent(event);
              }}
              className="bg-[#004a87] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#003561] transition-colors"
            >
              Ir al Panel de Colaboradores
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
