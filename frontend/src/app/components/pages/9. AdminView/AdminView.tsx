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
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

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
}

const mockColaboradores: Collaborator[] = [
  { id: '1', run: '12.345.678-5', nombre: 'Admin RedNorte', especialidad: 'Sistemas', establecimiento: 'Sede Central', rol: 'admin' },
  { id: '2', run: '33.333.333-3', nombre: 'Dr. Arnaldo Casas', especialidad: 'Cardiología', establecimiento: 'Sede Iquique', rol: 'medico' },
  { id: '3', run: '22.222.222-2', nombre: 'Enf. Marta Rojas', especialidad: 'Toma de Muestras', establecimiento: 'Sede Iquique', rol: 'enfermeria' },
];

export function AdminView() {
  const [colaboradores, setColaboradores] = useState<Collaborator[]>(mockColaboradores);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado del Formulario
  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [establecimiento, setEstablecimiento] = useState('Sede Iquique');
  const [rol, setRol] = useState('medico');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrado de colaboradores
  const filteredColaboradores = colaboradores.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.establecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.run.includes(searchTerm)
  );

  // Manejador de Registro
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!run.trim() || !nombre.trim() || !especialidad.trim()) {
      toast.error('Campos incompletos', { description: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newCollaborator: Collaborator = {
        id: `colab-${Date.now()}`,
        run: run.trim(),
        nombre: nombre.trim(),
        especialidad: especialidad.trim(),
        establecimiento: establecimiento,
        rol: rol
      };

      setColaboradores(prev => [newCollaborator, ...prev]);
      
      // Reset formulario
      setRun('');
      setNombre('');
      setEspecialidad('');
      setRol('medico');
      setIsSubmitting(false);

      toast.success('Colaborador creado', {
        description: `${newCollaborator.nombre} ha sido agregado con éxito.`
      });
    }, 600);
  };

  // Manejador de Eliminación
  const handleDelete = (id: string, nombre: string) => {
    toast(`¿Eliminar colaborador?`, {
      description: `Esta acción revocará los accesos de ${nombre} al sistema.`,
      action: {
        label: 'Confirmar Eliminación',
        onClick: () => {
          setColaboradores(prev => prev.filter(c => c.id !== id));
          toast.success('Colaborador eliminado', {
            description: `Se han revocado los accesos de ${nombre}.`
          });
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
              placeholder="Buscar por nombre, especialidad o RUN..."
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
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {c.especialidad}</span>
                          <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {c.establecimiento}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">
                        <Shield className="h-3 w-3" />
                        {ROLES.find(r => r.id === c.rol)?.label || c.rol}
                      </div>
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
    </div>
  );
}
