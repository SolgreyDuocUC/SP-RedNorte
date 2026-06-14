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
  KeyRound,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { slotsRemote } from '../../../../remotes/slots.remote';
import { usersRemote, UserDTO } from '../../../../remotes/users.remote';

const ROLES = [
  { id: 'all', label: 'Todos los Roles' },
  { id: 'admin', label: 'Administradores' },
  { id: 'medico', label: 'Médicos / Clínicos' },
  { id: 'enfermeria', label: 'Enfermería / Técnicos' },
  { id: 'administrativo', label: 'Administrativos' }
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

export function AdminView() {
  const [colaboradores, setColaboradores] = useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all'); // Filtro predefinido rápido
  
  // Estado del Formulario
  const [run, setRun] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [establecimiento, setEstablecimiento] = useState('Sede Iquique');
  const [rol, setRol] = useState('medico');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados Gestión de Horarios / Contraseñas
  const [selectedDoctorForSchedule, setSelectedDoctorForSchedule] = useState<Collaborator | null>(null);
  const [slotStart, setSlotStart] = useState('');
  const [slotEnd, setSlotEnd] = useState('');
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);
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

        return {
          id: u.id || '',
          run: u.run || '',
          nombre: `${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno || ''}`.trim(),
          especialidad: rolStr === 'medico' ? (u.direccion || 'Medicina General') : 'Personal Staff', 
          establecimiento: 'Sede Iquique',
          rol: rolStr,
          email: u.email
        };
      });
      setColaboradores(mapped);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar colaboradores');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: UserDTO = {
        run: run.trim(),
        nombre: nombre.trim(),
        segundoNombre: segundoNombre.trim(),
        apellidoPaterno: apellidoPaterno.trim(),
        apellidoMaterno: apellidoMaterno.trim(),
        numeroTelefono: numeroTelefono.trim(),
        direccion: especialidad.trim(), // Reutilizando campo según lógica local
        email: email.trim(),
        password: password,
        enabled: true,
        roles: [{ name: 'ROLE_' + rol.toUpperCase() }]
      };
      await usersRemote.create(payload);
      toast.success('Colaborador registrado con éxito');
      
      // Reset completo
      setRun(''); setEmail(''); setPassword(''); setNombre(''); setSegundoNombre('');
      setApellidoPaterno(''); setApellidoMaterno(''); setNumeroTelefono(''); setDireccion(''); setEspecialidad('');
      await fetchUsers();
    } catch (error) {
      toast.error('Error al registrar colaborador');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForSchedule) return;
    setIsCreatingSlot(true);
    try {
      await slotsRemote.create({
        practitionerId: selectedDoctorForSchedule.id,
        specialty: selectedDoctorForSchedule.especialidad,
        start: new Date(slotStart).toISOString(),
        end: new Date(slotEnd).toISOString(),
        status: 'free'
      });
      toast.success('Cupo de atención creado');
      setSelectedDoctorForSchedule(null);
    } catch (error) {
      toast.error('Error al crear cupo');
    } finally {
      setIsCreatingSlot(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedColabForPassword) return;
    setIsUpdatingPassword(true);
    try {
      await usersRemote.update(selectedColabForPassword.id, {
        run: selectedColabForPassword.run,
        nombre: selectedColabForPassword.nombre,
        apellidoPaterno: '', apellidoMaterno: '',
        email: selectedColabForPassword.email,
        password: newPassword,
        enabled: true,
        roles: [{ name: 'ROLE_' + selectedColabForPassword.rol.toUpperCase() }]
      });
      toast.success('Contraseña actualizada');
      setSelectedColabForPassword(null);
    } catch (error) {
      toast.error('Error al cambiar contraseña');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDelete = (id: string, nombreColab: string) => {
    toast(`¿Eliminar colaborador?`, {
      description: `Se revocarán los accesos de ${nombreColab}.`,
      action: {
        label: 'Confirmar',
        onClick: async () => {
          await usersRemote.delete(id);
          await fetchUsers();
        }
      }
    });
  };

  // Filtrado Avanzado combinado (Texto + Botón Rol Predefinido)
  const filteredColaboradores = colaboradores.filter(c => {
    const matchesSearch = 
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.run.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRoleFilter === 'all' || c.rol === selectedRoleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 px-4">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="border-b border-slate-200/60 pb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#004a87] flex items-center gap-3">
          <div className="p-2 bg-sky-50 rounded-xl text-[#0096c7]">
            <Users className="h-7 w-7" />
          </div>
          Centro de Control de Personal
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl">
          Plataforma de alta visibilidad para el alta de profesionales, asignación de centros médicos y control operativo de accesos.
        </p>
      </div>

      {/* BLOQUE SUPERIOR: FORMULARIO LIMPIO EN ANCHO COMPLETO */}
      <Card className="border border-slate-200/80 shadow-md rounded-2xl overflow-hidden bg-white">
        <div className="h-2 w-full bg-gradient-to-r from-[#0096c7] via-[#004a87] to-[#023e8a]" />
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-[#004a87] font-bold">
            <UserPlus className="h-5 w-5 text-[#0096c7]" />
            Formulario Unificado de Registro Clínico
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Bloque Identificación Básica */}
              <div className="space-y-4 bg-slate-50/40 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-[#004a87] tracking-wider uppercase block border-b pb-1">1. Credenciales</span>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">RUN del Profesional *</label>
                  <input required value={run} onChange={e => setRun(e.target.value)} placeholder="Ej: 12.345.678-9" className="w-full px-3 py-2.5 border rounded-lg text-sm font-medium shadow-sm outline-none focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/10" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Correo Electrónico Corporativo *</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="usuario@rednorte.cl" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm outline-none focus:border-[#0096c7]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Contraseña Provisoria *</label>
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña fuerte" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm outline-none focus:border-[#0096c7]" />
                </div>
              </div>

              {/* Bloque Identidad Legal */}
              <div className="space-y-4 bg-slate-50/40 p-4 rounded-xl border border-slate-100 md:col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <span className="text-xs font-bold text-[#004a87] tracking-wider uppercase block border-b pb-1 col-span-full">2. Datos Antropométricos y Legales</span>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Primer Nombre *</label>
                  <input required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Segundo Nombre</label>
                  <input value={segundoNombre} onChange={e => setSegundoNombre(e.target.value)} placeholder="Opcional" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Apellido Paterno *</label>
                  <input required value={apellidoPaterno} onChange={e => setApellidoPaterno(e.target.value)} placeholder="Apellido Paterno" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Apellido Materno *</label>
                  <input required value={apellidoMaterno} onChange={e => setApellidoMaterno(e.target.value)} placeholder="Apellido Materno" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm" />
                </div>
              </div>

              {/* Bloque Asignación Clínica */}
              <div className="space-y-4 bg-slate-50/40 p-4 rounded-xl border border-slate-100 col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <span className="text-xs font-bold text-[#004a87] tracking-wider uppercase block border-b pb-1 col-span-full">3. Rol Operativo y Locación</span>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Especialidad Principal o Cargo *</label>
                  <input required value={especialidad} onChange={e => setEspecialidad(e.target.value)} placeholder="Ej: Cardiología / Recepción" className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Teléfono de Contacto</label>
                  <input value={numeroTelefono} onChange={e => setNumeroTelefono(e.target.value)} placeholder="Ej: +569..." className="w-full px-3 py-2.5 border rounded-lg text-sm shadow-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Establecimiento Asignado</label>
                  <select value={establecimiento} onChange={e => setEstablecimiento(e.target.value)} className="w-full px-3 py-2.5 border rounded-lg text-sm bg-white shadow-sm outline-none">
                    <option value="Sede Iquique">Sede Iquique</option>
                    <option value="Sede Antofagasta">Sede Antofagasta</option>
                    <option value="Sede Calama">Sede Calama</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Rol de Permisos del Sistema</label>
                  <select value={rol} onChange={e => setRol(e.target.value)} className="w-full px-3 py-2.5 border rounded-lg text-sm bg-white shadow-sm outline-none font-semibold text-slate-700">
                    {ROLES.filter(r => r.id !== 'all').map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-[#004a87] hover:bg-[#0077b6] text-white rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                ) : (
                  <>
                    <UserCheck className="h-5 w-5" />
                    Registrar e Incorporar al Personal
                  </>
                )}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* BLOQUE INFERIOR: CATALOGO CON FILTROS PREDEFINIDOS (ACCESIBILIDAD MÁXIMA) */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-slate-800">
            <Filter className="h-5 w-5 text-[#0096c7]" />
            <h3 className="font-bold text-lg md:text-xl">Filtros Operativos de Personal</h3>
          </div>
          
          {/* BOTONES PREDEFINIDOS / PÍLDORAS GRANDES (Para clics rápidos asistidos) */}
          <div className="flex flex-wrap gap-2">
            {ROLES.map(roleOption => (
              <button
                key={roleOption.id}
                type="button"
                onClick={() => setSelectedRoleFilter(roleOption.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  selectedRoleFilter === roleOption.id
                    ? 'bg-[#0096c7] text-white border-transparent shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {roleOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT DE BUSQUEDA GENERAL */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Escribe el nombre o RUN para buscar..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm md:text-base focus:ring-4 focus:ring-[#0096c7]/10 outline-none shadow-sm placeholder:text-slate-400"
          />
        </div>

        {/* CONTENEDOR DE LA TABLA/LISTA */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden">
          {filteredColaboradores.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium">
              No se encontraron colaboradores registrados bajo este filtro o término.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredColaboradores.map(c => (
                <div key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/80 transition-colors gap-4">
                  <div className="flex items-start md:items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 text-[#004a87]">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base md:text-lg">{c.nombre}</h4>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs md:text-sm text-slate-500">
                        <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                          RUN: {c.run}
                        </span>
                        <span className="hidden md:inline text-slate-300">|</span>
                        <span className="font-medium text-slate-600">{c.email}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs md:text-sm text-slate-500">
                        <span className="flex items-center gap-1.5 font-semibold text-[#004a87]">
                          <Briefcase className="h-4 w-4 shrink-0 text-[#0096c7]" /> {c.especialidad}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Building2 className="h-4 w-4 shrink-0 text-slate-400" /> {c.establecimiento}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botonera de Acciones Laterales */}
                  <div className="flex items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 mr-2">
                      <Shield className="h-3.5 w-3.5 text-slate-500" />
                      {ROLES.find(r => r.id === c.rol)?.label.replace('s', '') || c.rol}
                    </div>
                    
                    {c.rol === 'medico' && (
                      <button
                        onClick={() => setSelectedDoctorForSchedule(c)}
                        className="p-2.5 text-slate-500 hover:text-[#0096c7] hover:bg-sky-50 rounded-xl transition-all border border-slate-100 bg-white shadow-sm"
                        title="Gestionar Agenda"
                      >
                        <Calendar className="h-5 w-5" />
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedColabForPassword(c)}
                      className="p-2.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all border border-slate-100 bg-white shadow-sm"
                      title="Cambiar Contraseña"
                    >
                      <KeyRound className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => handleDelete(c.id, c.nombre)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-slate-100 bg-white shadow-sm"
                      title="Dar de Baja"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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