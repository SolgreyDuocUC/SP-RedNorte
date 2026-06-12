import { useState, useEffect } from 'react';
import { Hospital, MapPin, Plus, RefreshCw, Server, Trash2, Edit2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { facilitiesRemote, FacilityDTO } from '../../../../remotes/facilities.remote';
import { SPECIALTIES } from '../../../../core/constants/BookingConst';


export function AdminFacilitiesView() {
  const [facilities, setFacilities] = useState<FacilityDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [type, setType] = useState('hospital');
  const [address, setAddress] = useState('');
  const [commune, setCommune] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);

  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const data = await facilitiesRemote.getAll();
      setFacilities(data);
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión', { description: 'No se pudieron obtener los centros desde el servidor.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleAddSpecialty = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const cleanSpec = specialtyInput.trim();
    if (!cleanSpec) return;

    if (specialties.includes(cleanSpec)) {
      toast.warning('Especialidad duplicada', { description: `La especialidad "${cleanSpec}" ya fue agregada.` });
      return;
    }

    setSpecialties([...specialties, cleanSpec]);
    setSpecialtyInput('');
  };

  const handleRemoveSpecialty = (specToRemove: string) => {
    setSpecialties(specialties.filter(s => s !== specToRemove));
  };

  const handleEditInit = (facility: FacilityDTO) => {
    setEditingId(facility.id);
    setName(facility.name);
    setStatus(facility.status);
    setType(facility.type || 'hospital');
    setAddress(facility.address || '');
    setCommune(facility.commune || '');
    setRegion(facility.region || '');
    setPhone(facility.phone || '');
    setEmail(facility.email || '');
    setSpecialties(facility.specialties || []);
    setSpecialtyInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setStatus('active');
    setType('hospital');
    setAddress('');
    setCommune('');
    setRegion('');
    setPhone('');
    setEmail('');
    setSpecialties([]);
    setSpecialtyInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const payload: Partial<FacilityDTO> = {
        name: name.trim(),
        status,
        type,
        address: address.trim(),
        commune: commune.trim(),
        region: region.trim(),
        phone: phone.trim(),
        email: email.trim(),
        specialties
      };

      if (editingId) {
        payload.id = editingId;
      }

      await facilitiesRemote.create(payload);
      toast.success(editingId ? 'Centro actualizado' : 'Centro creado', { 
        description: `El centro "${name}" ha sido registrado exitosamente en el sistema.` 
      });
      
      handleCancelEdit();
      fetchFacilities();
    } catch (error) {
      console.error(error);
      toast.error('Error', { description: 'No se pudo registrar el centro en el servidor.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, facilityName: string) => {
    if (!confirm(`¿Está seguro que desea eliminar el centro "${facilityName}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await facilitiesRemote.delete(id);
      toast.success('Centro eliminado', { description: `El centro "${facilityName}" ha sido retirado del sistema.` });
      if (editingId === id) {
        handleCancelEdit();
      }
      fetchFacilities();
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar', { description: 'No se pudo eliminar el centro seleccionado.' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <Hospital className="h-6 w-6 text-[#0096c7]" />
            Gestión de Establecimientos de Salud
          </h2>
          <p className="text-sm text-slate-500 mt-1">Administra los centros médicos y sus especialidades activas en el sistema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMULARIO DE CREACIÓN/EDICIÓN */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden bg-white">
            <div className="h-2 w-full bg-gradient-to-r from-[#0096c7] to-[#023e8a]" />
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-[#023e8a]">
                {editingId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingId ? 'Editar Centro' : 'Nuevo Centro'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Nombre del Centro</label>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Hospital Regional Iquique"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Tipo</label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                    >
                      <option value="hospital">Hospital</option>
                      <option value="clinic">Clínica</option>
                      <option value="primary-care">Atención Primaria</option>
                      <option value="specialized-center">Centro Especializado</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Estado Operativo</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                    >
                      <option value="active">Activo (Active)</option>
                      <option value="suspended">Suspendido (Suspended)</option>
                      <option value="inactive">Inactivo (Inactive)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Dirección</label>
                  <input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Ej. Av. Arturo Prat 1850"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Comuna</label>
                    <input
                      value={commune}
                      onChange={e => setCommune(e.target.value)}
                      placeholder="Ej. Iquique"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Región</label>
                    <input
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                      placeholder="Ej. Tarapacá"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Teléfono</label>
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Ej. +56 57 2391000"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                    <input
                      value={email}
                      type="email"
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Ej. contacto@hriquique.cl"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* GESTIÓN DE ESPECIALIDADES */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Especialidades</label>
                  <div className="flex gap-2">
                    <select
                      value={specialtyInput}
                      onChange={e => setSpecialtyInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                    >
                      <option value="">Seleccione especialidad...</option>
                      {SPECIALTIES.map(spec => (
                        <option key={spec.id} value={spec.name}>{spec.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddSpecialty}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Añadir
                    </button>
                  </div>

                  {/* Listado de especialidades agregadas */}
                  {specialties.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {specialties.map(spec => (
                        <span key={spec} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-medium border border-slate-200">
                          {spec}
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecialty(spec)}
                            className="text-slate-400 hover:text-slate-600 rounded-full focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic pt-1">No se han ingresado especialidades.</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-semibold transition-all text-sm text-center"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-[#023e8a] hover:bg-[#0077b6] text-white py-2.5 rounded-lg font-semibold shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Server className="h-4 w-4" />
                        {editingId ? 'Guardar Cambios' : 'Registrar en BD'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* LISTADO DE CENTROS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
            {isLoading ? (
              <div className="p-8 flex flex-col items-center justify-center h-full text-slate-400">
                <RefreshCw className="h-8 w-8 animate-spin mb-4 text-[#0096c7]" />
                <p>Cargando centros de salud...</p>
              </div>
            ) : facilities.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                <Hospital className="h-12 w-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-2">Sin registros</h3>
                <p className="text-slate-500 max-w-sm">No se encontraron centros de atención registrados en el servidor. Utilice el formulario para registrar un nuevo centro.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                <div className="p-4 bg-slate-50 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase">
                  <div className="col-span-2">ID</div>
                  <div className="col-span-5">Nombre del Centro / Especialidades</div>
                  <div className="col-span-2">Estado</div>
                  <div className="col-span-3 text-right">Acciones</div>
                </div>
                {facilities.map(facility => (
                  <div key={facility.id} className="p-4 grid grid-cols-12 gap-4 items-start hover:bg-slate-50/50 transition-colors">
                    <div className="col-span-2 font-mono text-xs text-slate-500 pt-1">
                      #{facility.id}
                    </div>
                    <div className="col-span-5 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#0096c7] shrink-0" />
                        <span className="font-semibold text-slate-800 text-sm">{facility.name}</span>
                      </div>
                      
                      {/* Especialidades del centro */}
                      {facility.specialties && facility.specialties.length > 0 ? (
                        <div className="flex flex-wrap gap-1 pl-6">
                          {facility.specialties.map(spec => (
                            <span key={spec} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-semibold border border-blue-100/50">
                              {spec}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic pl-6">Sin especialidades cargadas</span>
                      )}
                    </div>
                    
                    <div className="col-span-2 pt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${facility.status === 'active' ? 'bg-green-100 text-green-800' : 
                          facility.status === 'suspended' ? 'bg-amber-100 text-amber-800' : 
                          'bg-slate-100 text-slate-800'}`}>
                        {facility.status || 'Active'}
                      </span>
                    </div>

                    <div className="col-span-3 flex justify-end gap-1">
                      <button
                        onClick={() => handleEditInit(facility)}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-800 rounded-lg transition"
                        title="Editar Centro"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(facility.id, facility.name)}
                        className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition"
                        title="Eliminar Centro"
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
