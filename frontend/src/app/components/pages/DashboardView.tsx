import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Clock, 
  AlertTriangle, 
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function DashboardView() {
  return (
    /* mt-[104px] para dar aire respecto al header y evitar solapamiento */
    <div className="mt-[104px] md:mt-[88px] min-h-screen bg-[#f8fafc] p-4 md:p-8 space-y-8 font-sans">
      
      {/* HEADER DE BIENVENIDA Y ACCIONES RÁPIDAS (RF16, RF19) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[#004a87] tracking-tight">Panel de Gestión Clínica</h2>
          <p className="text-slate-500 text-sm mt-1">
            <span className="font-semibold text-[#00a7b1]">Sede Iquique</span> · {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* RF16: Búsqueda rápida de pacientes */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#00a7b1] transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar paciente (RUT/Nombre)..." 
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm w-full md:w-80 focus:ring-2 focus:ring-[#00a7b1]/20 focus:border-[#00a7b1] outline-none shadow-sm transition-all"
            />
          </div>
          {/* RF1: Botón para agendar */}
          <button className="flex items-center gap-2 bg-[#004a87] hover:bg-[#003561] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all">
            <Plus className="h-4 w-4" /> Nueva Cita
          </button>
        </div>
      </div>

      {/* INDICADORES DE GESTIÓN (RF18, RF17) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pacientes en Espera</p>
                <h3 className="text-3xl font-bold text-[#004a87] mt-1">24</h3>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#004a87]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
              <Activity className="h-3 w-3 mr-1" /> Flujo normal hoy
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgencias (C1-C2)</p>
                <h3 className="text-3xl font-bold text-[#e63946] mt-1">03</h3>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-[#e63946]" />
              </div>
            </div>
            <p className="mt-4 text-xs font-bold text-[#e63946] animate-pulse">Atención prioritaria requerida</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Box Ocupados</p>
                <h3 className="text-3xl font-bold text-[#004a87] mt-1">10<span className="text-lg text-slate-300">/12</span></h3>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#00a7b1]/10 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-[#00a7b1]" />
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00a7b1] h-full w-[83%]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiempo Promedio</p>
                <h3 className="text-3xl font-bold text-[#004a87] mt-1">22<span className="text-lg text-slate-300">m</span></h3>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                <Clock className="h-6 w-6 text-slate-500" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 font-medium">+5m respecto a ayer</p>
          </CardContent>
        </Card>
      </div>

      {/* ÁREA OPERATIVA: LISTA DE ESPERA Y TAREAS (RF3, RF4, RF5, RF6) */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* RF3, RF4: Lista de Pacientes con Priorización */}
        <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between py-5">
            <div>
              <CardTitle className="text-lg font-bold text-[#004a87]">Sala de Espera Virtual</CardTitle>
              <p className="text-xs text-slate-500 mt-1">Gestión activa de pacientes ingresados</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors border border-slate-100">
              <Filter className="h-4 w-4 text-slate-500" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f8fafc] text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4 text-center">Prioridad (RF4)</th>
                    <th className="px-6 py-4">Estado (RF5)</th>
                    <th className="px-6 py-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { id: '1', name: "Andrés Villalobos", rut: "15.432.111-0", type: "Priorizado", status: "En Espera", color: "bg-red-50 text-red-600 border-red-100", time: "Hace 12m" },
                    { id: '2', name: "Beatriz Soto", rut: "18.990.222-k", type: "Normal", status: "Llamado", color: "bg-blue-50 text-blue-600 border-blue-100", time: "Hace 45m" },
                    { id: '3', name: "Carlos Meneses", rut: "12.777.333-4", type: "Urgente", status: "En Box", color: "bg-emerald-50 text-emerald-600 border-emerald-100", time: "Hace 5m" },
                  ].map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#004a87] text-white flex items-center justify-center font-bold text-xs">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#004a87]">{p.name}</p>
                            <p className="text-[11px] text-slate-500 italic">{p.rut}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="outline" className={`${p.color} text-[10px] font-bold`}>{p.type}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{p.status}</span>
                          <span className="text-[10px] text-slate-400">{p.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                          <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-[#f8fafc] border-t border-slate-100 text-center">
              <button className="text-sm font-bold text-[#00a7b1] hover:text-[#008d96] flex items-center gap-2 mx-auto transition-colors">
                Ver historial completo <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* COLUMNA LATERAL: NOTIFICACIONES Y TURNOS (RF9, RF14) */}
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold text-[#004a87] flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#00a7b1]" /> Recordatorios Operativos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 p-3 rounded-xl bg-orange-50/50 border border-orange-100">
                <div className="h-2 w-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-orange-900 leading-tight text-balance">Reabastecimiento de Insumos</p>
                  <p className="text-xs text-orange-700 mt-1">Box 03 requiere kit de curación avanzada.</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-blue-900 leading-tight">Cambio de Turno (14:00)</p>
                  <p className="text-xs text-blue-700 mt-1">Validar bitácora de novedades con enfermería.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ACCESO RÁPIDO TELEMEDICINA (RF2) */}
          <Card className="bg-gradient-to-br from-[#004a87] to-[#00a7b1] text-white border-none shadow-lg overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Stethoscope className="h-24 w-24" />
            </div>
            <CardContent className="p-6 relative z-10">
              <h3 className="text-xl font-bold">Telemedicina</h3>
              <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                Hay <span className="font-bold underline">5 pacientes</span> en espera virtual para atención inmediata.
              </p>
              <button className="mt-6 w-full bg-white text-[#004a87] py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-[#f0f9ff] transition-all">
                Ingresar a Sala Virtual
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}