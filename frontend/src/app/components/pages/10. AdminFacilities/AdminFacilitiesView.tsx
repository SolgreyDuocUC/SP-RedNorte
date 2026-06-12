import { useState, useEffect } from 'react';
import { Hospital, MapPin, Database, Plus, RefreshCw, Server } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { facilitiesRemote, FacilityDTO } from '../../../../remotes/facilities.remote';
import { mockFacilities } from '../../../../mocks/mockFacilities';

export function AdminFacilitiesView() {
  const [facilities, setFacilities] = useState<FacilityDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');

  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const data = await facilitiesRemote.getAll();
      setFacilities(data);
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión', { description: 'No se pudieron obtener los centros desde el servidor ms-centros.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await facilitiesRemote.create({
        name: name.trim(),
        status
      });
      toast.success('Centro creado', { description: `El centro "${name}" ha sido registrado en el sistema.` });
      setName('');
      setStatus('active');
      fetchFacilities();
    } catch (error) {
      console.error(error);
      toast.error('Error', { description: 'No se pudo crear el centro.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSyncMockData = async () => {
    setIsSyncing(true);
    try {
      for (const mock of mockFacilities) {
        // Only creating name and active status as backend Location only uses these + ID natively.
        await facilitiesRemote.create({
          id: mock.id,
          name: mock.name,
          status: 'active'
        });
      }
      toast.success('Sincronización Exitosa', { description: 'Se han cargado los centros de prueba al backend real.' });
      fetchFacilities();
    } catch (error) {
      console.error(error);
      toast.error('Error de sincronización', { description: 'Algunos centros no se pudieron guardar.' });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <Hospital className="h-6 w-6 text-[#0096c7]" />
            Gestión de Centros (Backend FHIR)
          </h2>
          <p className="text-sm text-slate-500 mt-1">Administra los establecimientos de salud conectados al microservicio ms-centros.</p>
        </div>
        
        {facilities.length === 0 && !isLoading && (
          <button 
            onClick={handleSyncMockData}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            Cargar Datos Iniciales (Mock)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMULARIO DE CREACIÓN */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-[#0096c7] to-[#023e8a]" />
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-[#023e8a]">
                <Plus className="h-5 w-5" />
                Nuevo Centro
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
                    placeholder="Ej. Clínica San José"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#0096c7]/20 focus:border-[#0096c7] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Estado FHIR</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0096c7]/20 outline-none"
                  >
                    <option value="active">Activo (Active)</option>
                    <option value="suspended">Suspendido (Suspended)</option>
                    <option value="inactive">Inactivo (Inactive)</option>
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
                      <Server className="h-4 w-4" />
                      Registrar en BD
                    </>
                  )}
                </button>
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
                <p>Cargando centros desde el servidor...</p>
              </div>
            ) : facilities.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                <Database className="h-12 w-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-2">Sin registros</h3>
                <p className="text-slate-500 max-w-sm">No se encontraron centros de atención en el servidor. Puedes registrarlos manualmente o cargar los datos iniciales de prueba.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                <div className="p-4 bg-slate-50 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase">
                  <div className="col-span-2">ID Server</div>
                  <div className="col-span-7">Nombre del Centro</div>
                  <div className="col-span-3 text-right">Estado</div>
                </div>
                {facilities.map(facility => (
                  <div key={facility.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
                    <div className="col-span-2 font-mono text-xs text-slate-500">
                      #{facility.id}
                    </div>
                    <div className="col-span-7">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#0096c7]" />
                        <span className="font-semibold text-slate-800 text-sm">{facility.name}</span>
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${facility.status === 'active' ? 'bg-green-100 text-green-800' : 
                          facility.status === 'suspended' ? 'bg-amber-100 text-amber-800' : 
                          'bg-slate-100 text-slate-800'}`}>
                        {facility.status || 'Active'}
                      </span>
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
