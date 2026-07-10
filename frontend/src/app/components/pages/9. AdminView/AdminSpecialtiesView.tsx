import { useState, useEffect } from 'react';
import { Stethoscope, Plus, Search, Edit2, Trash2, Loader2, RefreshCw, X } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { toast } from 'sonner';
import { specialtiesRemote, type SpecialtyDTO } from '../../../../remotes/specialties.remote';

export function AdminSpecialtiesView() {
  const [specialties, setSpecialties] = useState<SpecialtyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados modales
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<SpecialtyDTO | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadSpecialties();
  }, []);

  const loadSpecialties = async () => {
    setLoading(true);
    try {
      const data = await specialtiesRemote.getAll();
      setSpecialties(data);
    } catch (error) {
      console.error('Error al cargar especialidades:', error);
      toast.error('Error al obtener el catálogo de especialidades desde la base de datos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingSpecialty(null);
    setNombre('');
    setDescripcion('');
    setShowModal(true);
  };

  const handleOpenEdit = (spec: SpecialtyDTO) => {
    setEditingSpecialty(spec);
    setNombre(spec.nombreEspecialidad);
    setDescripcion(spec.descripcionEspecialidad || '');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) {
      toast.error('Por favor completa el nombre y la descripción');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingSpecialty) {
        await specialtiesRemote.update(editingSpecialty.idEspecialidad, {
          nombreEspecialidad: nombre.trim(),
          descripcionEspecialidad: descripcion.trim()
        });
        toast.success('Especialidad actualizada correctamente en base de datos');
      } else {
        await specialtiesRemote.create({
          nombreEspecialidad: nombre.trim(),
          descripcionEspecialidad: descripcion.trim()
        });
        toast.success('Nueva especialidad creada correctamente en base de datos');
      }
      setShowModal(false);
      await loadSpecialties();
    } catch (error) {
      console.error('Error al guardar especialidad:', error);
      toast.error('Ocurrió un error al guardar en el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (spec: SpecialtyDTO) => {
    toast(`¿Eliminar la especialidad ${spec.nombreEspecialidad}?`, {
      description: 'Esta acción borrará el registro del catálogo en la base de datos.',
      action: {
        label: 'Confirmar',
        onClick: async () => {
          try {
            await specialtiesRemote.delete(spec.idEspecialidad);
            toast.success('Especialidad eliminada con éxito');
            await loadSpecialties();
          } catch (error) {
            console.error('Error al eliminar especialidad:', error);
            toast.error('No se pudo eliminar de la base de datos');
          }
        }
      }
    });
  };

  const filteredSpecialties = specialties.filter(spec =>
    spec.nombreEspecialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (spec.descripcionEspecialidad && spec.descripcionEspecialidad.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-purple-600" />
            Áreas y Especialidades
          </h2>
          <p className="text-sm text-slate-500 mt-1">Catálogo dinámico de especialidades médicas desde el backend de centros.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={loadSpecialties}
            disabled={loading}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
            title="Actualizar catálogo"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refrescar</span>
          </button>
          <button 
            onClick={handleOpenCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Nueva Especialidad
          </button>
        </div>
      </div>

      <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden bg-white">
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-indigo-600" />
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar especialidad o descripción en base de datos..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-sm text-slate-500 font-medium">Cargando catálogo de especialidades desde la base de datos...</p>
            </div>
          ) : filteredSpecialties.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm font-medium">
              No se encontraron especialidades en el catálogo bajo el criterio de búsqueda.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              <div className="p-4 bg-slate-50 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase">
                <div className="col-span-2 sm:col-span-1">ID</div>
                <div className="col-span-4 sm:col-span-3">Nombre</div>
                <div className="col-span-4 sm:col-span-6">Descripción</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>
              
              {filteredSpecialties.map(spec => (
                <div key={spec.idEspecialidad} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-2 sm:col-span-1 font-mono text-xs text-slate-500">
                    #{spec.idEspecialidad}
                  </div>
                  <div className="col-span-4 sm:col-span-3 font-semibold text-slate-800 text-sm">
                    {spec.nombreEspecialidad}
                  </div>
                  <div className="col-span-4 sm:col-span-6 text-sm text-slate-500">
                    {spec.descripcionEspecialidad || 'Sin descripción detallada registrada'}
                  </div>
                  <div className="col-span-2 flex justify-end gap-1">
                    <button 
                      onClick={() => handleOpenEdit(spec)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-purple-600 rounded-lg transition" 
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(spec)}
                      className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition" 
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* MODAL CREAR / EDITAR ESPECIALIDAD */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-[#023e8a] mb-2 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-purple-600" />
              {editingSpecialty ? 'Editar Especialidad' : 'Nueva Especialidad'}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {editingSpecialty 
                ? `Actualizando los datos de #${editingSpecialty.idEspecialidad}` 
                : 'Ingresa los datos para registrar una nueva especialidad médica en la base de datos.'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase">Nombre de la Especialidad *</label>
                <input 
                  required
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Ej: Cardiología Infantil"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase">Descripción *</label>
                <textarea 
                  required
                  rows={3}
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  placeholder="Describe brevemente el alcance y servicios de esta especialidad..."
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {isSubmitting ? 'Guardando...' : editingSpecialty ? 'Actualizar' : 'Crear en BD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
