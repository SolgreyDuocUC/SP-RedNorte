import { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  User, 
  KeyRound, 
  UserMinus, 
  LogOut, 
  Clock, 
  Building2, 
  UserCheck,
  ChevronRight,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';
import { patientRemote } from '../../../../remotes/patient.remote';
import { usersRemote, UserDTO } from '../../../../remotes/users.remote';
import { Reservahoraview } from '../8. Reservas/Reservahoraview';
import type { AppointmentDTO } from '../../../../remotes/dtos/appointment.dto';
import { formatRun } from '../../../../core/constants/BookingConst';

interface PatientPortalViewProps {
  onLogout: () => void;
}

export function PatientPortalView({ onLogout }: PatientPortalViewProps) {
  const [activeTab, setActiveTab] = useState<'agenda' | 'examenes' | 'reservar' | 'ajustes'>('agenda');
  const [patientData, setPatientData] = useState<any | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientRun, setPatientRun] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientId, setPatientId] = useState<string | null>(null);
  
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Form states for Settings
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const userId = localStorage.getItem('id') || '';

  // Mock Exams list for Rich Aesthetic
  const mockExams = [
    { id: '1', name: 'Hemograma Completo', date: '2026-05-10', doctor: 'Dr. Arnaldo Casas', status: 'Listo', result: 'Normal' },
    { id: '2', name: 'Perfil Lipídico', date: '2026-05-10', doctor: 'Dr. Arnaldo Casas', status: 'Listo', result: 'Colesterol levemente elevado' },
    { id: '3', name: 'Radiografía de Tórax', date: '2026-06-01', doctor: 'Dr. Juan Pérez', status: 'Listo', result: 'Sin hallazgos patológicos' },
    { id: '4', name: 'PCR COVID-19', date: '2026-06-12', doctor: 'Enf. Marta Rojas', status: 'Listo', result: 'Negativo' },
  ];

  useEffect(() => {
    if (userId) {
      loadUserInfo();
    }
  }, [userId]);

  const loadUserInfo = async () => {
    try {
      const patient = await patientRemote.getById(userId);
      setPatientData(patient);
      const nameVal = `${patient.firstName} ${patient.lastName}`.trim() || 'Paciente';
      const runVal = patient.identifierValue || '';
      
      setPatientName(nameVal);
      setPatientRun(runVal);
      setPatientEmail(patient.email || '');
      setPatientId(patient.id || null);

      if (patient.id) {
        loadAppointments(patient.id);
      }
    } catch (error) {
      console.error('Error loading patient info:', error);
      toast.error('Error al cargar la información del perfil');
    }
  };

  const loadAppointments = async (pId: string) => {
    setLoadingAppointments(true);
    try {
      const list = await appointmentsRemote.getByPatient(pId);
      setAppointments(list);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleCancelAppointment = async (appId: string) => {
    toast('¿Seguro que deseas cancelar esta cita?', {
      description: 'Esta acción liberará la hora médica.',
      action: {
        label: 'Confirmar',
        onClick: async () => {
          try {
            await appointmentsRemote.cancel(appId);
            toast.success('Cita cancelada con éxito');
            if (patientId) loadAppointments(patientId);
          } catch (error) {
            toast.error('Error al cancelar la cita');
          }
        }
      },
      cancel: { label: 'Volver', onClick: () => {} }
    });
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 4) {
      toast.error('Contraseña inválida', { description: 'Debe tener al menos 4 caracteres.' });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const currentPatient = await patientRemote.getById(userId);
      await patientRemote.update(userId, {
        ...currentPatient,
        password: newPassword
      });
      toast.success('Contraseña actualizada con éxito');
      setNewPassword('');
      setPatientData({ ...currentPatient, password: newPassword });
    } catch (error) {
      toast.error('Error al actualizar contraseña');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    toast('¿ELIMINAR MI CUENTA?', {
      description: 'Esta acción es irreversible y borrará todo tu historial de acceso del sistema.',
      action: {
        label: 'Eliminar Definitivamente',
        onClick: async () => {
          setIsDeletingAccount(true);
          try {
            await patientRemote.delete(userId);
            toast.success('Tu cuenta ha sido eliminada. Lamentamos que te vayas.');
            
            // Clean localStorage
            localStorage.clear();
            onLogout();
          } catch (error) {
            toast.error('Error al eliminar cuenta');
          } finally {
            setIsDeletingAccount(false);
          }
        }
      },
      cancel: { label: 'Cancelar', onClick: () => {} }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#0096c7]/10 flex items-center justify-center font-bold text-[#0096c7] text-lg">
            {patientName[0]?.toUpperCase() || 'P'}
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">{patientName}</h1>
            <p className="text-xs text-slate-400 font-mono">RUN: {patientRun} | {patientEmail}</p>
          </div>
        </div>

        <button 
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 hover:text-red-600 rounded-xl text-slate-600 text-sm font-semibold transition-all border border-slate-100 cursor-pointer"
        >
          <LogOut size={16} /> Cerrar Sesión
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-6 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('agenda')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
              ${activeTab === 'agenda' 
                ? 'bg-[#0096c7] text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#0096c7]'}`}
          >
            <span className="flex items-center gap-2"><Calendar size={18} /> Mi Agenda</span>
            <ChevronRight size={16} className={activeTab === 'agenda' ? 'opacity-100' : 'opacity-30'} />
          </button>

          <button
            onClick={() => setActiveTab('examenes')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
              ${activeTab === 'examenes' 
                ? 'bg-[#0096c7] text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#0096c7]'}`}
          >
            <span className="flex items-center gap-2"><FileText size={18} /> Mis Exámenes</span>
            <ChevronRight size={16} className={activeTab === 'examenes' ? 'opacity-100' : 'opacity-30'} />
          </button>

          <button
            onClick={() => setActiveTab('reservar')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
              ${activeTab === 'reservar' 
                ? 'bg-[#0096c7] text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#0096c7]'}`}
          >
            <span className="flex items-center gap-2"><UserCheck size={18} /> Reservar Nueva Hora</span>
            <ChevronRight size={16} className={activeTab === 'reservar' ? 'opacity-100' : 'opacity-30'} />
          </button>

          <button
            onClick={() => setActiveTab('ajustes')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
              ${activeTab === 'ajustes' 
                ? 'bg-[#0096c7] text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#0096c7]'}`}
          >
            <span className="flex items-center gap-2"><KeyRound size={18} /> Ajustes de Cuenta</span>
            <ChevronRight size={16} className={activeTab === 'ajustes' ? 'opacity-100' : 'opacity-30'} />
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Mi Agenda de Horas Médicas</h2>
                <p className="text-sm text-slate-500">Revisa tus próximas citas programadas y conéctate con tus especialistas.</p>
              </div>

              {loadingAppointments ? (
                <div className="flex justify-center p-12">
                  <div className="h-8 w-8 rounded-full border-4 border-[#0096c7]/20 border-t-[#0096c7] animate-spin" />
                </div>
              ) : appointments.length === 0 ? (
                <Card className="border-0 shadow-sm ring-1 ring-slate-100 text-center p-8 bg-white">
                  <CardContent className="pt-6">
                    <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="font-semibold text-slate-600 text-sm">No tienes citas médicas vigentes</p>
                    <p className="text-xs text-slate-400 mt-1 mb-6">Agenda una consulta con nuestros profesionales clínicos.</p>
                    <button 
                      onClick={() => setActiveTab('reservar')}
                      className="px-5 py-2.5 bg-[#0096c7] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0077b6] transition cursor-pointer"
                    >
                      Reservar una hora ahora
                    </button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointments.map((app) => (
                    <Card key={app.id} className="border-0 shadow-sm ring-1 ring-slate-100 bg-white overflow-hidden">
                      <div className="h-1.5 w-full bg-[#0096c7]" />
                      <CardHeader className="pb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0096c7] bg-sky-50 px-2.5 py-1 rounded w-fit">
                          {app.specialty}
                        </span>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                          <Clock className="h-4 w-4 text-slate-400" />
                          {new Date(app.start).toLocaleString('es-CL', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <User className="h-4 w-4 text-slate-400" />
                          {app.practitionerName || `Profesional ID: ${app.practitionerId}`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          {app.locationName || 'RedNorte Central'}
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex gap-2">
                          <button
                            onClick={() => handleCancelAppointment(app.id)}
                            className="w-full py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Cancelar Hora
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'examenes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Mis Resultados de Exámenes</h2>
                <p className="text-sm text-slate-500">Consulta los resultados de exámenes de laboratorio y estudios clínicos realizados en nuestra red.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                {mockExams.map((ex) => (
                  <div key={ex.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-800 text-sm">{ex.name}</h4>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{ex.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">Fecha: {ex.date} | Solicitado por: {ex.doctor}</p>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Resultado: <span className="text-slate-700 font-normal">{ex.result}</span></p>
                    </div>

                    <button 
                      onClick={() => toast.success(`Descargando PDF de ${ex.name}...`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0096c7]/5 hover:bg-[#0096c7]/10 text-[#0096c7] rounded-xl text-xs font-bold transition-all border border-[#0096c7]/10 w-fit shrink-0 cursor-pointer"
                    >
                      <Download size={14} /> PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservar' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Agendar Hora Médica</h2>
              <div className="h-[70vh]">
                <Reservahoraview 
                  onBack={() => setActiveTab('agenda')} 
                  initialBookingData={patientData ? {
                    idType: patientData.identifierType === 'PASSPORT' ? 'PASAPORTE' : 'RUN',
                    identifier: patientData.identifierValue ? formatRun(patientData.identifierValue) : '',
                    firstName: patientData.firstName || '',
                    lastName: patientData.lastName || '',
                    phone: patientData.phone || '',
                    email: patientData.email || '',
                    prevision: patientData.coverage ? (patientData.coverage.provider ? `${patientData.coverage.type === 'FONASA' ? 'Fonasa' : patientData.coverage.type === 'ISAPRE' ? 'Isapre' : patientData.coverage.type} - ${patientData.coverage.provider}` : (patientData.coverage.type === 'FONASA' ? 'Fonasa' : patientData.coverage.type === 'ISAPRE' ? 'Isapre' : patientData.coverage.type)) : 'Particular',
                  } : undefined}
                />
              </div>
            </div>
          )}

          {activeTab === 'ajustes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Ajustes de mi Cuenta</h2>
                <p className="text-sm text-slate-500">Administra tus opciones de seguridad y de permanencia en el portal.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CAMBIAR CONTRASEÑA */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <KeyRound className="text-amber-500" size={18} /> Cambiar mi Contraseña
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Nueva Contraseña</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="Mínimo 4 caracteres"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isUpdatingPassword || newPassword.length < 4}
                        className="px-4 py-2 bg-[#0096c7] hover:bg-[#0077b6] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {isUpdatingPassword ? 'Actualizando...' : 'Actualizar Contraseña'}
                      </button>
                    </form>
                  </CardContent>
                </Card>

                {/* ELIMINAR CUENTA */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-red-600 flex items-center gap-2">
                      <UserMinus className="text-red-500" size={18} /> Dar de Baja mi Cuenta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Al eliminar tu cuenta se revocarán todos tus accesos del sistema y ya no podrás ingresar con tus credenciales actuales a menos que te registres nuevamente.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeletingAccount}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      {isDeletingAccount ? 'Eliminando...' : 'Eliminar mi Cuenta'}
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
