import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Building2, 
  Shield, 
  Trash2, 
  Search,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { mockProfessionals, mockFacilities } from '../../../mocks/mockData';
import { Professional } from '../../../types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

// Roles disponibles en la plataforma
const ROLES = [
  { id: 'admin', label: 'Administrador' },
  { id: 'medico', label: 'Médico / Personal Clínico' },
  { id: 'enfermeria', label: 'Enfermería / Técnico' },
  { id: 'administrativo', label: 'Personal Administrativo' }
];

export function AdminView() {
  const [colaboradores, setColaboradores] = useState<Professional[]>(mockProfessionals);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado del Formulario
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [establecimiento, setEstablecimiento] = useState('');
  const [rol, setRol] = useState('medico');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrado de colaboradores
  const filteredColaboradores = colaboradores.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.establecimiento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejador de Registro
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || nombre.trim().length < 4) {
      toast.error('Nombre inválido', { description: 'Por favor ingresa el nombre completo del colaborador (mínimo 4 caracteres).' });
      return;
    }
    if (!especialidad.trim()) {
      toast.error('Cargo/Especialidad requerida', { description: 'Debes definir la especialidad o cargo del colaborador.' });
      return;
    }
    if (!establecimiento) {
      toast.error('Establecimiento requerido', { description: 'Selecciona un establecimiento de salud asignado.' });
      return;
    }

    toast('¿Crear nuevo colaborador?', {
      description: `Registrarás a ${nombre} como ${especialidad} en ${establecimiento}.`,
      action: {
        label: 'Confirmar',
        onClick: () => {
          setIsSubmitting(true);
          setTimeout(() => {
            const newCollaborator: Professional = {
              id: `dr${colaboradores.length + 1}`,
              nombre: nombre.trim(),
              especialidad: especialidad.trim(),
              establecimiento: establecimiento
            };

            setColaboradores(prev => [newCollaborator, ...prev]);
            
            // Reset formulario
            setNombre('');
            setEspecialidad('');
            setEstablecimiento('');
            setRol('medico');
            setIsSubmitting(false);

            toast.success('Colaborador creado', {
              description: `${newCollaborator.nombre} ha sido agregado con éxito.`
            });
          }, 600);
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {}
      }
    });
  };

  // Manejador de Eliminación (Simulado)
  const handleDelete = (id: string, nombre: string) => {
    toast(`¿Eliminar colaborador?`, {
      description: `Esta acción revocará los accesos de ${nombre} al sistema.`,
      action: {
        label: 'Eliminar',
        onClick: () => {
          setColaboradores(prev => prev.filter(c => c.id !== id));
          toast.success('Acceso revocado', {
            description: `Se han eliminado los registros de ${nombre}.`
          });
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {}
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header de la vista */}
      <div>
        <h2 className="text-2xl font-bold text-[#004a87] tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#00a7b1]" /> Panel de Administración
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Crea nuevos colaboradores, asigna roles de acceso y asócialos a establecimientos de la red.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMULARIO DE CREACIÓN (Columna Izquierda) */}
        <div className="lg:col-span-1">
          <Card className="shadow-md border border-slate-200/80 sticky top-4">
            <CardHeader className="bg-slate-50/80 border-b border-slate-200">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0b3c5d]">
                <UserPlus className="h-5 w-5 text-[#00a7b1]" /> Registrar Colaborador
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Dr. Juan Carlos Pérez"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none transition-all"
                  />
                </div>

                {/* Cargo / Especialidad */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Especialidad / Cargo
                  </label>
                  <input
                    type="text"
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    placeholder="Ej: Pediatría / Administrativo TI"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none transition-all"
                  />
                </div>

                {/* Rol de Acceso */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Rol de Acceso
                  </label>
                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none transition-all bg-white cursor-pointer"
                  >
                    {ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Establecimiento */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Establecimiento Asignado
                  </label>
                  <select
                    value={establecimiento}
                    onChange={(e) => setEstablecimiento(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="">Selecciona un establecimiento...</option>
                    {mockFacilities.map(f => (
                      <option key={f.id} value={f.nombre}>{f.nombre}</option>
                    ))}
                  </select>
                </div>

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 mt-4 flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all shadow-md select-none
                    ${isSubmitting 
                      ? 'bg-[#004a87]/70 cursor-not-allowed shadow-none' 
                      : 'bg-[#004a87] hover:bg-[#003866] active:scale-[0.98] cursor-pointer'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Registrando...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} /> Crear Colaborador
                    </>
                  )}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* LISTADO DE COLABORADORES (Columna Derecha) */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border border-slate-200/80">
            <CardHeader className="bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0b3c5d]">
                <Users className="h-5 w-5 text-[#00a7b1]" /> Colaboradores Activos ({colaboradores.length})
              </CardTitle>
              {/* Buscador */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar colaborador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none transition-all"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredColaboradores.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <th className="px-6 py-4">Colaborador</th>
                        <th className="px-6 py-4">Especialidad / Cargo</th>
                        <th className="px-6 py-4">Establecimiento</th>
                        <th className="px-6 py-4 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredColaboradores.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0096c7] to-[#023e8a] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                {c.nombre.substring(0, 2).replace('.', '')}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">{c.nombre}</p>
                                <p className="text-[10px] text-slate-400 font-mono">ID: {c.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <Briefcase size={14} className="text-slate-400 shrink-0" />
                              {c.especialidad}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <Building2 size={14} className="text-slate-400 shrink-0" />
                              {c.establecimiento}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleDelete(c.id, c.nombre)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Revocar acceso"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <UserCheck className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-semibold">No se encontraron colaboradores</p>
                  <p className="text-xs text-slate-400 mt-1">Prueba refinando la búsqueda o registra uno nuevo.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
