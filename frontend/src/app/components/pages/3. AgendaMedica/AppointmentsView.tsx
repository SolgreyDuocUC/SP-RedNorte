import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, MoreVertical, Plus, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { toast } from 'sonner';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';
import type { AppointmentDTO, CreateAppointmentDTO, AppointmentStatus } from '../../../../remotes/dtos/appointment.dto';

const statusConfig = {
  booked: { label: 'Confirmada', classes: 'bg-green-100 text-green-800 border-green-200' },
  scheduled: { label: 'Agendada', classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  cancelled: { label: 'Cancelada', classes: 'bg-red-100 text-red-800 border-red-200' },
  fulfilled: { label: 'Atendida', classes: 'bg-slate-100 text-slate-800 border-slate-200' },
  noshow: { label: 'No asiste', classes: 'bg-orange-100 text-orange-800 border-orange-200' },
  waitlist: { label: 'Lista de Espera', classes: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
};

export function AppointmentsView({ userRole = 'paciente' }: { userRole?: string }) {
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<CreateAppointmentDTO>({
    patientId: '',
    practitionerId: '',
    specialty: 'Medicina General',
    start: new Date().toISOString().slice(0, 16),
    end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
    status: 'booked',
    description: ''
  });

  const isAdmin = userRole === 'admin' || userRole === 'administrativo';

  const loadAppointments = async () => {
    setLoading(true);
    try {
      // Si es admin, trae todas; si es paciente, idealmente traería las suyas (aquí mockeamos ID por simplicidad hasta que haya login real completo)
      const data = isAdmin ? await appointmentsRemote.getAll() : await appointmentsRemote.getByPatient('pat-2024-001');
      setAppointments(data);
    } catch (error) {
      toast.error('Error de conexión', { description: 'No se pudieron cargar las citas médicas desde el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [userRole]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: CreateAppointmentDTO = {
        ...formData,
        start: new Date(formData.start).toISOString(),
        end: new Date(formData.end).toISOString()
      };
      await appointmentsRemote.create(payload);
      toast.success('Cita creada exitosamente');
      setIsCreating(false);
      loadAppointments();
    } catch (error) {
      toast.error('Error al crear la cita');
    }
  };

  const handleDelete = async (app: AppointmentDTO) => {
    if (!app.id) return;
    toast('¿Eliminar cita médica?', {
      description: 'Esta acción cancelará permanentemente la cita en el sistema.',
      action: {
        label: 'Eliminar',
        onClick: async () => {
          try {
            await appointmentsRemote.cancel(app.id!);
            toast.success('Cita eliminada (agenda liberada)', {
              description: '¿Deseas reagendarla para otra fecha?',
              action: {
                label: 'Reagendar',
                onClick: () => {
                  setFormData({
                    patientId: app.patientId,
                    practitionerId: app.practitionerId,
                    specialty: app.specialty,
                    start: new Date().toISOString().slice(0, 16),
                    end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
                    status: 'booked',
                    description: app.description || ''
                  });
                  setIsCreating(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            });
            loadAppointments();
          } catch (error) {
            toast.error('Error al eliminar');
          }
        }
      },
      cancel: { label: 'Cancelar', onClick: () => {} }
    });
  };

  const handleStatusChange = async (app: AppointmentDTO, newStatus: AppointmentStatus) => {
    if (!app.id) return;
    try {
      await appointmentsRemote.update(app.id, { status: newStatus });
      
      if (newStatus === 'cancelled') {
        toast.success('Cita cancelada (agenda liberada)', {
          description: '¿Deseas reagendarla para otra fecha?',
          action: {
            label: 'Reagendar',
            onClick: () => {
              setFormData({
                patientId: app.patientId,
                practitionerId: app.practitionerId,
                specialty: app.specialty,
                start: new Date().toISOString().slice(0, 16),
                end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
                status: 'booked',
                description: app.description || ''
              });
              setIsCreating(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        });
      } else {
        toast.success('Estado actualizado');
      }
      
      loadAppointments();
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  // Render para Admin/Administrativo
  if (isAdmin) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#0096c7]" />
              Gestión de Agenda Médica
            </h2>
            <p className="text-sm text-slate-500">Administra todas las citas agendadas en la red.</p>
          </div>
          <Button onClick={() => setIsCreating(!isCreating)} className="bg-[#023e8a] hover:bg-[#0077b6]">
            {isCreating ? 'Cancelar' : <><Plus className="h-4 w-4 mr-2"/> Agendar Cita</>}
          </Button>
        </div>

        {isCreating && (
          <Card className="border-[#0096c7]/20 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-[#023e8a]">Agendar Nueva Cita</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">ID Paciente</label>
                  <input required value={formData.patientId} onChange={e => setFormData({...formData, patientId: e.target.value})} placeholder="Ej. pat-2024-001" className="w-full p-2 text-sm border rounded" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">ID Especialista</label>
                  <input required value={formData.practitionerId} onChange={e => setFormData({...formData, practitionerId: e.target.value})} placeholder="Ej. pract-001" className="w-full p-2 text-sm border rounded" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Especialidad</label>
                  <input required value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full p-2 text-sm border rounded" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Estado</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as AppointmentStatus})} className="w-full p-2 text-sm border rounded bg-white">
                    <option value="booked">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                    <option value="fulfilled">Atendida</option>
                    <option value="noshow">No asiste</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Fecha y Hora de Inicio</label>
                  <input type="datetime-local" required value={formData.start} onChange={e => setFormData({...formData, start: e.target.value})} className="w-full p-2 text-sm border rounded" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Fecha y Hora de Fin</label>
                  <input type="datetime-local" required value={formData.end} onChange={e => setFormData({...formData, end: e.target.value})} className="w-full p-2 text-sm border rounded" />
                </div>
                <div className="col-span-1 md:col-span-2 mt-2">
                  <Button type="submit" className="w-full bg-[#0096c7] hover:bg-[#0077b6]">Confirmar Agendamiento</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Cargando citas médicas desde el servidor...</div>
          ) : appointments.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No hay citas médicas registradas en el sistema.</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Fecha y Hora</th>
                  <th className="px-4 py-3">Paciente (ID)</th>
                  <th className="px-4 py-3">Especialista (ID)</th>
                  <th className="px-4 py-3">Especialidad</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map(app => {
                  const sConf = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.booked;
                  const startDate = new Date(app.start);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                        <div className="font-medium">{startDate.toLocaleDateString()}</div>
                        <div className="text-xs text-slate-500">{startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{app.patientId}</td>
                      <td className="px-4 py-3 text-slate-600">{app.practitionerId}</td>
                      <td className="px-4 py-3 font-medium text-[#023e8a]">{app.specialty}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={sConf.classes}>{sConf.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        {app.status !== 'cancelled' ? (
                          <button onClick={() => handleStatusChange(app, 'cancelled')} className="text-xs text-orange-500 hover:underline">Cancelar</button>
                        ) : (
                          <button 
                            onClick={() => {
                              setFormData({
                                patientId: app.patientId,
                                practitionerId: app.practitionerId,
                                specialty: app.specialty,
                                start: new Date().toISOString().slice(0, 16),
                                end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
                                status: 'booked',
                                description: app.description || ''
                              });
                              setIsCreating(true);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} 
                            className="text-xs text-[#0096c7] hover:underline"
                          >
                            Reagendar
                          </button>
                        )}
                        <button onClick={() => handleDelete(app)} className="text-slate-400 hover:text-red-600" title="Eliminar registro"><Trash2 className="h-4 w-4 inline" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  // Render para Paciente (y otros)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#023e8a]">Mis Citas Médicas</h2>
          <p className="text-sm text-muted-foreground">Gestiona tus citas programadas en la red.</p>
        </div>
      </div>

      {loading ? (
        <Card className="p-10 text-center text-slate-500">Cargando tus citas médicas...</Card>
      ) : appointments.length === 0 ? (
        <Card className="p-10 text-center text-slate-500">No tienes citas médicas agendadas actualmente.</Card>
      ) : (
        <div className="space-y-3">
          {appointments.map(app => {
            const sConf = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.booked;
            const startDate = new Date(app.start);
            return (
              <Card key={app.id}>
                <CardContent className="p-5 flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096c7] to-[#023e8a]">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#023e8a]">{app.specialty}</h3>
                      <Badge variant="outline" className={sConf.classes}>{sConf.label}</Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" /> {startDate.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-primary" /> {app.practitionerId}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
