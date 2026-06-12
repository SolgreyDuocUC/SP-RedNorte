import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Building2, 
  Shield, 
  Trash2, 
  Search,
  Briefcase,
  UserCheck,
  Calendar,
  KeyRound
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { slotsRemote } from '../../../../remotes/slots.remote';
import { usersRemote, UserDTO } from '../../../../remotes/users.remote';

// Roles disponibles en la plataforma
const ROLES = [
  { id: 'admin', label: 'Administrador' },
  { id: 'medico', label: 'Médico / Personal Clínico' },
  { id: 'enfermeria', label: 'Enfermería / Técnico' },
  { id: 'administrativo', label: 'Personal Administrativo' }
];

export interface Collaborator {
  id: string;
  run: string;
  nombre: string;
  especialidad: string;
  establecimiento: string;
  rol: string;
  email: string;
}

import { MOCK_DOCTORS } from '../../../../core/constants/BookingConst';

export function AdminView() {
  const [colaboradores, setColaboradores] = useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado del Formulario
  const [run, setRun] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [establecimiento, setEstablecimiento] = useState('Sede Iquique');
  const [rol, setRol] = useState('medico');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados Gestión de Horarios (Slots)
  const [selectedDoctorForSchedule, setSelectedDoctorForSchedule] = useState<Collaborator | null>(null);
  const [slotStart, setSlotStart] = useState('');
  const [slotEnd, setSlotEnd] = useState('');
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);

  // Estados Gestión de Contraseñas
  const [selectedColabForPassword, setSelectedColabForPassword] = useState<Collaborator | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await usersRemote.getAll();
      const mapped = usersData.map(u => {
        const rawRole = u.roles?.[0]?.name?.toLowerCase() || '';
        let rolStr = 'paciente';
        if (rawRole.includes('admin')) rolStr = 'admin';
        else if (rawRole.includes('medico')) rolStr = 'medico';
        else if (rawRole.includes('enfermeria')) rolStr = 'enfermeria';
        else if (rawRole.includes('administrativo')) rolStr = 'administrativo';

        // Parse RUN and Name from username (format: RUN|Name)
        const parts = u.username.split('|');
        const runVal = parts[0] || '';
        const nombreVal = parts[1] || u.username;

        return {
          id: u.id || '',
          run: runVal,
          nombre: nombreVal,
          especialidad: rolStr === 'medico' ? 'Medicina General' : 'Personal',
          establecimiento: 'Sede Iquique',
          rol: rolStr,
          email: u.email
        };
      });
      setColaboradores(mapped);
    } catch (error) {
      console.error("Error loading users from ms-usuarios:", error);
      toast.error('Error al cargar colaboradores', { description: 'No se pudo conectar con el microservicio de usuarios.' });
    }
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForSchedule || !slotStart || !slotEnd) return;
    setIsCreatingSlot(true);
    try {
      await slotsRemote.create({
        practitionerId: selectedDoctorForSchedule.id,
        specialty: selectedDoctorForSchedule.especialidad,
        start: new Date(slotStart).toISOString(),
        end: new Date(slotEnd).toISOString(),
        status: 'free'
      });
      toast.success('Cupo creado con éxito', { description: `Horario agendado para ${selectedDoctorForSchedule.nombre}` });
      setSlotStart('');
      setSlotEnd('');
      setSelectedDoctorForSchedule(null);
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el cupo', { description: 'Revisa tu conexión al servidor ms-reservas.' });
    } finally {
      setIsCreatingSlot(false);
    }
  };

  // Cambio de contraseña para colaborador existente
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedColabForPassword || !newPassword.trim()) return;
    setIsUpdatingPassword(true);
    try {
      const payload: UserDTO = {
        username: `${selectedColabForPassword.run}|${selectedColabForPassword.nombre}`,
        email: selectedColabForPassword.email,
        password: newPassword,
        enabled: true,
        roles: [{ name: 'ROLE_' + selectedColabForPassword.rol.toUpperCase() }]
      };
      await usersRemote.update(selectedColabForPassword.id, payload);
      toast.success('Contraseña actualizada', { description: `La contraseña de ${selectedColabForPassword.nombre} ha sido cambiada con éxito.` });
      setNewPassword('');
      setSelectedColabForPassword(null);
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error('Error al actualizar contraseña');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Filtrado de colaboradores
  const filteredColaboradores = colaboradores.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.establecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.run.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejador de Registro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!run.trim() || !email.trim() || !nombre.trim() || !password.trim()) {
      toast.error('Campos incompletos', { description: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: UserDTO = {
        username: `${run.trim()}|${nombre.trim()}`,
        email: email.trim(),
        password: password,
        enabled: true,
        roles: [{ name: 'ROLE_' + rol.toUpperCase() }]
      };

      const newUser = await usersRemote.create(payload);

      toast.success('Colaborador creado', {
        description: `${nombre.trim()} ha sido agregado con éxito en el sistema.`
      });

      // Reset formulario
      setRun('');
      setEmail('');
      setPassword('');
      setNombre('');
      setEspecialidad('');
      setRol('medico');
      
      // Refresh list
      await fetchUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error('Error al crear colaborador', { description: error.response?.data?.message || 'Revisa los datos provistos o el estado del servidor.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejador de Eliminación
  const handleDelete = (id: string, nombreColab: string) => {
    toast(`¿Eliminar colaborador?`, {
      description: `Esta acción revocará los accesos de ${nombreColab} al sistema.`,
      action: {
        label: 'Confirmar Eliminación',
        onClick: async () => {
          try {
            await usersRemote.delete(id);
            toast.success('Colaborador eliminado', {
              description: `Se han revocado los accesos de ${nombreColab}.`
            });
            await fetchUsers();
          } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error al eliminar colaborador');
          }
        }
      },
      cancel: { label: 'Cancelar', onClick: () => {} }
    });
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <Users className="h-6 w-6 text-[#0096c7]" />
            Gestión de Colaboradores
          </h2>
          <p className="text-sm text-slate-500 mt-1">Crea, edita o elimina accesos para el personal de salud y administrativos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMULARIO DE CREACIÓN */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-[#0096c7] to-[#023e8a]" />
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-[#023e8a]">
                <UserPlus className="h-5 w-5" />
                Nuevo Colaborador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">RUN</label>
                  <input
                    required
                    value={run}
                    onChange={e => setRun(e.target.value)}
                    placeholder="12.345.678-9"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email / Correo</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="colaborador@rednorte.cl"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Contraseña</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Contraseña de acceso"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Nombre Completo</label>
                  <input
                    required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ej. Dr. Juan Pérez"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Especialidad / Cargo</label>
                  <input
                    required
                    value={especialidad}
                    onChange={e => setEspecialidad(e.target.value)}
                    placeholder="Ej. Cardiología / Administrativo"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Establecimiento Asignado</label>
                  <select
                    value={establecimiento}
                    onChange={e => setEstablecimiento(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                  >
                    <option value="Sede Iquique">Sede Iquique</option>
                    <option value="Sede Antofagasta">Sede Antofagasta</option>
                    <option value="Sede Calama">Sede Calama</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Rol en el Sistema</label>
                  <select
                    value={rol}
                    onChange={e => setRol(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                  >
                    {ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#023e8a] hover:bg-[#0077b6] text-white py-2.5 rounded-lg font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4" />
                      Registrar Colaborador
                    </>
                  )}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* LISTADO DE COLABORADORES */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, especialidad o Email..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#0096c7]/20 outline-none shadow-sm"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {filteredColaboradores.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No se encontraron colaboradores que coincidan con la búsqueda.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredColaboradores.map(c => (
                  <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#0096c7]/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-[#0096c7]" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{c.nombre}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-slate-500">
                          <div className="flex items-center gap-3">
                            <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 font-semibold">RUN: {c.run}</span>
                            <span className="text-slate-400">|</span>
                            <span className="text-slate-500">{c.email}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {c.especialidad}</span>
                            <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {c.establecimiento}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">
                        <Shield className="h-3 w-3" />
                        {ROLES.find(r => r.id === c.rol)?.label || c.rol}
                      </div>
                      
                      {/* Botón para gestionar Horarios (solo médicos) */}
                      {c.rol === 'medico' && (
                        <button
                          onClick={() => setSelectedDoctorForSchedule(c)}
                          className="p-2 text-slate-400 hover:text-[#0096c7] hover:bg-sky-50 rounded-lg transition-colors"
                          title="Gestionar Horarios (Cupos)"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>
                      )}

                      {/* Botón para cambiar Contraseña */}
                      <button
                        onClick={() => setSelectedColabForPassword(c)}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Cambiar Contraseña"
                      >
                        <KeyRound className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(c.id, c.nombre)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar colaborador"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE GESTIÓN DE HORARIOS */}
      {selectedDoctorForSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#023e8a] mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Horarios de {selectedDoctorForSchedule.nombre}
            </h3>
            <p className="text-sm text-slate-500 mb-6">Agrega cupos de atención para que aparezcan en el portal de pacientes.</p>
            
            <form onSubmit={handleCreateSlot} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Fecha y Hora de Inicio</label>
                <input 
                  type="datetime-local" 
                  required
                  value={slotStart}
                  onChange={e => setSlotStart(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Fecha y Hora de Fin</label>
                <input 
                  type="datetime-local" 
                  required
                  value={slotEnd}
                  onChange={e => setSlotEnd(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setSelectedDoctorForSchedule(null)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors">
                  Cerrar
                </button>
                <button type="submit" disabled={isCreatingSlot} className="flex-1 px-4 py-2 bg-[#0096c7] hover:bg-[#0077b6] text-white rounded-lg text-sm font-semibold transition-colors">
                  {isCreatingSlot ? 'Guardando...' : 'Añadir Cupo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CAMBIO DE CONTRASEÑA */}
      {selectedColabForPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#023e8a] mb-2 flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-500" /> Restablecer Contraseña
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Ingresa la nueva contraseña para <strong>{selectedColabForPassword.nombre}</strong>. El administrador no puede ver contraseñas anteriores.
            </p>
            
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Nueva Contraseña</label>
                <input 
                  type="password" 
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setSelectedColabForPassword(null);
                    setNewPassword('');
                  }} 
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdatingPassword || newPassword.length < 4} 
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {isUpdatingPassword ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
