import { Stethoscope, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

export function AdminSpecialtiesView() {
  const specialties = [
    { id: 1, name: 'Cardiología', description: 'Atención especializada en corazón y vasos sanguíneos.', active: true },
    { id: 2, name: 'Dermatología', description: 'Tratamiento de afecciones a la piel y prevención.', active: true },
    { id: 3, name: 'Neurología', description: 'Atención a trastornos del sistema nervioso central.', active: true },
    { id: 4, name: 'Pediatría', description: 'Medicina integral para niños y adolescentes.', active: false },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-purple-600" />
            Áreas y Especialidades
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configura las especialidades médicas disponibles en la red de salud.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" />
          Nueva Especialidad
        </button>
      </div>

      <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden bg-white">
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-indigo-600" />
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                placeholder="Buscar especialidad..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="divide-y divide-slate-100">
            <div className="p-4 bg-slate-50 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase">
              <div className="col-span-1">ID</div>
              <div className="col-span-3">Nombre</div>
              <div className="col-span-5">Descripción</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-1 text-right">Acciones</div>
            </div>
            
            {specialties.map(spec => (
              <div key={spec.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-1 font-mono text-xs text-slate-500">
                  #{spec.id}
                </div>
                <div className="col-span-3 font-semibold text-slate-800 text-sm">
                  {spec.name}
                </div>
                <div className="col-span-5 text-sm text-slate-500">
                  {spec.description}
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                    ${spec.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {spec.active ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end gap-1">
                  <button className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-800 rounded-lg transition" title="Editar">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition" title="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
