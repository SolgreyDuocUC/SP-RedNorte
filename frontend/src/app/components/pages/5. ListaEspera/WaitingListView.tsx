import { Clock, AlertCircle, Hospital, Calendar, Search, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { mockEntries } from '../../../../mocks/mockEntries';
import { priorityConfig } from '../../../../imports/priorityConfig';
import { useState, useMemo } from 'react';

export function WaitingListView() {
  // Estados para la búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Obtener listas únicas para los selectores de filtros dinámicos
  const specialties = useMemo(() => [...new Set(mockEntries.map(e => e.specialty))], []);
  const facilities = useMemo(() => [...new Set(mockEntries.map(e => e.facility))], []);
  const priorities = useMemo(() => [...new Set(mockEntries.map(e => e.priority))], []);

  // Lógica de filtrado combinada
  const filteredEntries = useMemo(() => {
    return mockEntries.filter(entry => {
      const matchesSearch = 
        entry.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty = selectedSpecialty === '' || entry.specialty === selectedSpecialty;
      const matchesFacility = selectedFacility === '' || entry.facility === selectedFacility;
      const matchesPriority = selectedPriority === '' || entry.priority === selectedPriority;
      
      // Filtro por día: Compara la fecha de ingreso (se asume formato YYYY-MM-DD o similar)
      const matchesDate = selectedDate === '' || entry.entryDate.includes(selectedDate);

      return matchesSearch && matchesSpecialty && matchesFacility && matchesPriority && matchesDate;
    });
  }, [searchTerm, selectedSpecialty, selectedFacility, selectedPriority, selectedDate]);

  // Función para resetear todos los filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setSelectedFacility('');
    setSelectedPriority('');
    setSelectedDate('');
  };

  const isFiltered = searchTerm || selectedSpecialty || selectedFacility || selectedPriority || selectedDate;

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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Pacientes en Espera</CardTitle>
                <CardDescription>
                  {isFiltered 
                    ? `Mostrando ${filteredEntries.length} de ${mockEntries.length} registros filtrados`
                    : "Lista detallada de requerimientos médicos"
                  }
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar ID, diagnóstico..."
                    className="h-9 w-[230px] rounded-md border border-input bg-white pl-8 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:bg-slate-50 ${showFilters ? 'bg-slate-100 border-slate-400 text-[#023e8a]' : 'bg-white border-input'}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avanzados
                </button>

                {isFiltered && (
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-600 shadow-sm hover:bg-red-100 transition-colors"
                    title="Limpiar todos los filtros"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            {/* Desplegable de Filtros Avanzados */}
            {showFilters && (
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 rounded-lg bg-slate-100/70 border border-slate-200 transition-all animate-in fade-in-50 duration-200">
                {/* Filtro por Día */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">Fecha de Ingreso</label>
                  <input
                    type="date"
                    className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                {/* Filtro por Especialidad */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">Especialidad</label>
                  <select
                    className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    <option value="">Todas las especialidades</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro por Establecimiento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">Establecimiento</label>
                  <select
                    className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                  >
                    <option value="">Todos los centros</option>
                    {facilities.map(fac => (
                      <option key={fac} value={fac}>{fac}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro por Prioridad */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">Prioridad</label>
                  <select
                    className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {priorities.map(prio => (
                      <option key={prio} value={prio}>
                        {priorityConfig[prio as keyof typeof priorityConfig]?.label || prio}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
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
                        <Badge className={`${pCfg?.classes || 'bg-slate-100'} border-0 shadow-sm font-semibold`}>
                          {pCfg?.label || entry.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isOverdue ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {entry.elapsedDays} d
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {/* Aquí puedes mantener tu botón MoreHorizontal original */}
                        <button className="px-2 py-1 text-xs font-medium text-[#023e8a] bg-blue-50 hover:bg-blue-100 rounded transition-colors">
                          Gestionar
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      No se encontraron registros que coincidan con los filtros aplicados.
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