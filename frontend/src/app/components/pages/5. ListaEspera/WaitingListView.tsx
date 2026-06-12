import { Clock, AlertCircle, Hospital, Calendar, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { mockEntries } from '../../../../mocks/mockEntries';
import { priorityConfig } from '../../../../imports/priorityConfig';
import { useState } from 'react';

export function WaitingListView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = mockEntries.filter(entry => 
    entry.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.facility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#023e8a]">Gestión de Lista de Espera</h2>
        <p className="text-sm text-muted-foreground">Panel de administración de pacientes pendientes de asignación</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total en Espera</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">{mockEntries.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Pacientes activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prioridad Alta</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockEntries.filter(e => e.priority === 'alta').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Casos urgentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tiempo Promedio</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">52 días</div>
            <p className="text-xs text-muted-foreground mt-1">Espera general</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Asignados Hoy</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
              <Hospital className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">14</div>
            <p className="text-xs text-muted-foreground mt-1">Pacientes resueltos</p>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader className="border-b bg-slate-50/50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Pacientes en Espera</CardTitle>
              <CardDescription>Lista detallada de requerimientos médicos</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar especialidad o diagnóstico..."
                  className="h-9 w-[250px] rounded-md border border-input bg-transparent pl-8 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-white px-3 shadow-sm hover:bg-slate-50">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-3 font-medium">ID / Ingreso</th>
                  <th className="px-4 py-3 font-medium">Especialidad</th>
                  <th className="px-4 py-3 font-medium">Diagnóstico</th>
                  <th className="px-4 py-3 font-medium">Establecimiento</th>
                  <th className="px-4 py-3 font-medium">Prioridad</th>
                  <th className="px-4 py-3 font-medium text-center">Espera</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEntries.map((entry) => {
                  const pCfg = priorityConfig[entry.priority as keyof typeof priorityConfig];
                  const isOverdue = entry.elapsedDays > entry.estimatedDays;
                  
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{entry.id}</div>
                        <div className="text-xs text-slate-500">{entry.entryDate}</div>
                      </td>
                      <td className="px-4 py-3 font-medium text-[#023e8a]">{entry.specialty}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate" title={entry.diagnosis}>
                        {entry.diagnosis}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{entry.facility}</td>
                      <td className="px-4 py-3">
                        <Badge className={`${pCfg.classes} border-0 shadow-sm font-semibold`}>
                          {pCfg.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isOverdue ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {entry.elapsedDays} d
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-[#023e8a] hover:bg-blue-50 rounded-md transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      No se encontraron registros que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
