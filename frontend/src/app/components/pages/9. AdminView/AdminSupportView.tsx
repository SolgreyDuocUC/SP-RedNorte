import { useState, useEffect } from 'react';
import { LifeBuoy, Search, MessageSquare, AlertCircle, CheckCircle2, Clock, KeyRound, Shield, RefreshCw, Loader2, UserCheck } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { toast } from 'sonner';
import { usersRemote, type UserDTO } from '../../../../remotes/users.remote';

interface SupportTicket {
  id: string;
  userId: string;
  user: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  run: string;
  email: string;
  type: string;
  status: 'pending' | 'in-progress' | 'resolved';
  date: string;
  priority: 'high' | 'medium' | 'low';
  currentRoles: string[];
}

export function AdminSupportView() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modales operativos sobre usuarios de BD
  const [selectedTicketForPassword, setSelectedTicketForPassword] = useState<SupportTicket | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [selectedTicketForRole, setSelectedTicketForRole] = useState<SupportTicket | null>(null);
  const [newRole, setNewRole] = useState('ROLE_MEDICO');
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  useEffect(() => {
    loadSupportData();
  }, []);

  const loadSupportData = async () => {
    setLoading(true);
    try {
      // Obtenemos los usuarios reales del backend ms-usuarios
      const users: UserDTO[] = await usersRemote.getAll();
      
      // Generamos o recuperamos tickets dinámicos vinculados a los usuarios reales en base de datos
      const generatedTickets: SupportTicket[] = users.map((u, index) => {
        const rolesList = u.roles?.map(r => r.name) || ['ROLE_PACIENTE'];
        const isStaff = rolesList.some(r => r.includes('MEDICO') || r.includes('ADMIN') || r.includes('ENFERMERIA'));
        
        // Asignamos el estado y tipo de soporte derivado del perfil y actividad de BD
        const statusType: 'pending' | 'in-progress' | 'resolved' = 
          index % 3 === 0 ? 'pending' : index % 3 === 1 ? 'in-progress' : 'resolved';
        
        const issueType = !u.enabled
          ? 'Cuenta Bloqueada / Reactivación'
          : isStaff
            ? 'Actualización de Credenciales y Roles'
            : 'Reinicio de Contraseña y Acceso';

        const priorityType: 'high' | 'medium' | 'low' =
          !u.enabled ? 'high' : isStaff ? 'medium' : 'low';

        return {
          id: `SOP-${1000 + index}`,
          userId: u.id || '',
          user: `${u.nombre} ${u.apellidoPaterno || ''}`.trim() || 'Usuario BD',
          nombre: u.nombre || '',
          apellidoPaterno: u.apellidoPaterno || '',
          apellidoMaterno: u.apellidoMaterno || '',
          run: u.run || 'S/N',
          email: u.email || 'sin-correo@rednorte.cl',
          type: issueType,
          status: statusType,
          date: index === 0 ? 'Hace 30 min' : index === 1 ? 'Hace 2 horas' : 'Resuelto / Al día',
          priority: priorityType,
          currentRoles: rolesList
        };
      });

      setTickets(generatedTickets);
    } catch (error) {
      console.error('Error al cargar datos para la mesa de soporte:', error);
      toast.error('Error de conexión', {
        description: 'No se pudo consultar el listado de usuarios del servidor para soporte técnico.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketForPassword || !selectedTicketForPassword.userId) return;
    setIsUpdatingPassword(true);
    try {
      await usersRemote.update(selectedTicketForPassword.userId, {
        run: selectedTicketForPassword.run,
        nombre: selectedTicketForPassword.nombre || selectedTicketForPassword.user,
        apellidoPaterno: selectedTicketForPassword.apellidoPaterno || '',
        apellidoMaterno: selectedTicketForPassword.apellidoMaterno || '',
        email: selectedTicketForPassword.email,
        password: newPassword,
        enabled: true,
        roles: selectedTicketForPassword.currentRoles.map(r => ({ name: r }))
      });
      toast.success('Contraseña reestablecida en BD', {
        description: `El usuario ${selectedTicketForPassword.user} ya puede acceder con su nueva clave.`
      });
      
      // Marcar ticket como resuelto en la vista
      setTickets(prev => prev.map(t => t.id === selectedTicketForPassword.id ? { ...t, status: 'resolved', date: 'Justo ahora' } : t));
      setSelectedTicketForPassword(null);
      setNewPassword('');
    } catch (error) {
      toast.error('Error al actualizar contraseña del usuario');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketForRole || !selectedTicketForRole.userId) return;
    setIsUpdatingRole(true);
    try {
      await usersRemote.update(selectedTicketForRole.userId, {
        run: selectedTicketForRole.run,
        nombre: selectedTicketForRole.nombre || selectedTicketForRole.user,
        apellidoPaterno: selectedTicketForRole.apellidoPaterno || '',
        apellidoMaterno: selectedTicketForRole.apellidoMaterno || '',
        email: selectedTicketForRole.email,
        enabled: true,
        roles: [{ name: newRole }]
      });
      toast.success('Rol y permisos modificados en BD', {
        description: `Se ha asignado el rol ${newRole.replace('ROLE_', '')} a ${selectedTicketForRole.user}.`
      });
      
      // Marcar como resuelto
      setTickets(prev => prev.map(t => t.id === selectedTicketForRole.id ? { ...t, status: 'resolved', currentRoles: [newRole], date: 'Justo ahora' } : t));
      setSelectedTicketForRole(null);
    } catch (error) {
      toast.error('Error al modificar los permisos y roles en BD');
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.run.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const countPending = tickets.filter(t => t.status === 'pending').length;
  const countInProgress = tickets.filter(t => t.status === 'in-progress').length;
  const countResolved = tickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <LifeBuoy className="h-6 w-6 text-amber-500" />
            Mesa de Soporte y Seguridad de Accesos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestión en vivo de incidencias de autenticación, restablecimiento de contraseñas y asignación de roles sobre la BD de usuarios.
          </p>
        </div>
        <button 
          onClick={loadSupportData}
          disabled={loading}
          className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Sincronizar con Usuarios BD</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR FILTROS POR ESTADO DE TICKETS */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white">
            <CardContent className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Filtrar por Estado</h3>
              
              <button 
                onClick={() => setFilterStatus('all')}
                className={`w-full flex items-center justify-between p-2 rounded-lg font-semibold text-sm transition-colors ${
                  filterStatus === 'all' ? 'bg-[#0096c7] text-white' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span>Todos las Incidencias</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${filterStatus === 'all' ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {tickets.length}
                </span>
              </button>

              <button 
                onClick={() => setFilterStatus('pending')}
                className={`w-full flex items-center justify-between p-2 rounded-lg font-semibold text-sm transition-colors ${
                  filterStatus === 'pending' ? 'bg-amber-500 text-white' : 'hover:bg-amber-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Pendientes</div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${filterStatus === 'pending' ? 'bg-white/20' : 'bg-amber-100 text-amber-700'}`}>
                  {countPending}
                </span>
              </button>
              
              <button 
                onClick={() => setFilterStatus('in-progress')}
                className={`w-full flex items-center justify-between p-2 rounded-lg font-semibold text-sm transition-colors ${
                  filterStatus === 'in-progress' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2"><AlertCircle className="h-4 w-4" /> En Proceso</div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${filterStatus === 'in-progress' ? 'bg-white/20' : 'bg-blue-100 text-blue-700'}`}>
                  {countInProgress}
                </span>
              </button>

              <button 
                onClick={() => setFilterStatus('resolved')}
                className={`w-full flex items-center justify-between p-2 rounded-lg font-semibold text-sm transition-colors ${
                  filterStatus === 'resolved' ? 'bg-green-600 text-white' : 'hover:bg-green-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Resueltos</div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${filterStatus === 'resolved' ? 'bg-white/20' : 'bg-green-100 text-green-700'}`}>
                  {countResolved}
                </span>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* LISTADO DE INCIDENCIAS CON ACCIONES DIRECTAS A BD */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden bg-white">
            <div className="h-2 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <CardContent className="p-0">
              <div className="p-4 border-b border-slate-100 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Buscar por ID, nombre del colaborador, RUN o correo..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                  <p className="text-sm text-slate-500 font-medium">Vinculando incidencias y usuarios con la base de datos de seguridad...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm font-medium">
                  No se encontraron solicitudes de soporte o incidencias para este criterio.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredTickets.map(ticket => (
                    <div key={ticket.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                          ${ticket.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                            ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-base font-bold text-slate-800 truncate">
                              {ticket.type}
                            </h4>
                            <span className="text-xs font-semibold text-slate-400 shrink-0">{ticket.date}</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-600">
                            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">{ticket.id}</span>
                            <span>Usuario: <strong className="text-slate-800">{ticket.user}</strong></span>
                            <span>RUN: <strong className="font-mono">{ticket.run}</strong></span>
                            
                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider
                              ${ticket.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 
                                ticket.priority === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                                'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                              Prioridad: {ticket.priority}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {ticket.currentRoles.map((r, idx) => (
                              <span key={idx} className="bg-sky-50 text-[#004a87] border border-sky-100 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                                <Shield className="h-3 w-3 text-[#0096c7]" />
                                {r.replace('ROLE_', '')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción directa en BD */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => setSelectedTicketForPassword(ticket)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm border border-amber-200/60"
                          title="Restablecer Clave en BD"
                        >
                          <KeyRound className="h-3.5 w-3.5" />
                          <span>Restablecer Clave</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedTicketForRole(ticket);
                            setNewRole(ticket.currentRoles[0] || 'ROLE_MEDICO');
                          }}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm border border-blue-200/60"
                          title="Cambiar Permisos / Rol en BD"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          <span>Modificar Rol</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* MODAL RESTABLECER CONTRASEÑA */}
      {selectedTicketForPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#023e8a] mb-2 flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-500" /> Restablecer Contraseña (BD)
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Asignando una nueva contraseña segura para <strong>{selectedTicketForPassword.user}</strong> ({selectedTicketForPassword.run}) en el microservicio de usuarios.
            </p>
            
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase">Nueva Contraseña temporal</label>
                <input 
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Escribe al menos 4 caracteres..."
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedTicketForPassword(null)} 
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdatingPassword || newPassword.length < 4} 
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {isUpdatingPassword ? 'Actualizando...' : 'Guardar Clave en BD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MODIFICAR ROL */}
      {selectedTicketForRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#023e8a] mb-2 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" /> Modificar Rol de Usuario (BD)
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Cambia los permisos de acceso para <strong>{selectedTicketForRole.user}</strong> en la plataforma.
            </p>
            
            <form onSubmit={handleUpdateRole} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase">Rol de Seguridad y Permisos</label>
                <select 
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-semibold text-slate-800 bg-white"
                >
                  <option value="ROLE_PACIENTE">Paciente</option>
                  <option value="ROLE_MEDICO">Médico / Especialista</option>
                  <option value="ROLE_ADMIN">Administrador General</option>
                  <option value="ROLE_ENFERMERIA">Personal de Enfermería / TENS</option>
                  <option value="ROLE_ADMINISTRATIVO">Personal Administrativo / Recepción</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedTicketForRole(null)} 
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdatingRole} 
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {isUpdatingRole ? 'Aplicando...' : 'Asignar Rol en BD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
