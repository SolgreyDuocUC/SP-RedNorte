import { 
  Activity, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ChevronRight,
  ClipboardList,
  Stethoscope
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  mockPatients, 
  mockWaitingList 
} from '../../../mocks/mockData';
import { Patient, WaitingListEntry } from '../../../types/clinical';

export function DashboardNurse() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-500 text-white';
      case 'media': return 'bg-amber-400 text-white';
      case 'baja': return 'bg-emerald-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'alta': return 'border-l-4 border-l-red-500';
      case 'media': return 'border-l-4 border-l-amber-400';
      case 'baja': return 'border-l-4 border-l-emerald-500';
      default: return 'border-l-4 border-l-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#004a87]">Dashboard Enfermería (Triage)</h2>
          <p className="text-sm text-slate-500">Gestión de flujo y priorización de pacientes</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-red-100 text-red-700 border-red-200">2 Alta Prioridad</Badge>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">2 Media</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">1 Baja</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista de Triage / Espera */}
        <Card className="lg:col-span-2 shadow-lg border-none overflow-hidden">
          <CardHeader className="bg-white border-b py-5">
            <CardTitle className="text-lg font-bold text-[#004a87] flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#00a7b1]" /> Pacientes en Espera de Categorización / Atención
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {mockWaitingList.map((entry: WaitingListEntry) => {
                const pac = mockPatients.find((p: Patient) => p.id === entry.pacienteId);
                return (
                  <div key={entry.id} className={`p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group ${getPriorityBorder(entry.prioridad)}`}>
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${getPriorityColor(entry.prioridad)}`}>
                        {entry.prioridad.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{pac?.nombre}</p>
                        <p className="text-[11px] text-slate-500">{pac?.run} · {entry.tipoAtencion}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] flex items-center gap-1 text-slate-400 font-medium">
                            <Clock className="h-3 w-3" /> Ingreso: {entry.fechaIngreso}
                          </span>
                          <span className="text-[10px] flex items-center gap-1 text-[#00a7b1] font-bold uppercase tracking-tighter">
                             Box Sugerido: {Math.floor(Math.random() * 5) + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-slate-100 hover:bg-[#004a87] hover:text-white p-2 rounded-lg transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Panel Lateral: Box y Estado */}
        <div className="space-y-6">
          <Card className="shadow-md border-none">
            <CardHeader className="border-b">
              <CardTitle className="text-base font-bold text-[#004a87] flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00a7b1]" /> Estado de Boxes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map(box => (
                  <div key={box} className={`p-3 rounded-lg border text-center transition-all ${box % 3 === 0 ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                    <p className="text-xs font-bold">Box {box}</p>
                    <p className="text-[10px] mt-1">{box % 3 === 0 ? 'Ocupado' : 'Disponible'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg border-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-white/80" />
                <div>
                  <h3 className="font-bold text-sm">Alertas Médicas</h3>
                  <p className="text-[10px] text-amber-100">1 Paciente crítico detectado</p>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-xs leading-relaxed italic">
                "Paciente en Box 2 requiere validación de signos vitales urgente."
              </div>
            </CardContent>
          </Card>

          <button className="w-full flex items-center justify-center gap-2 bg-[#004a87] hover:bg-[#003561] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all">
            <Stethoscope className="h-4 w-4" /> Categorizar Paciente
          </button>
        </div>
      </div>
    </div>
  );
}
