import { FileText, Calendar, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const mockHistory = [
  {
    id: '1',
    date: '15 Abril 2026',
    specialty: 'Medicina Interna',
    practitioner: 'Dra. Ana Torres',
    facility: 'Hospital Regional Iquique',
    type: 'Consulta',
    diagnosis: 'Control de rutina - Presión arterial normal',
    notes: 'Paciente en buen estado general. Se recomienda continuar con tratamiento actual.',
  },
  {
    id: '2',
    date: '3 Marzo 2026',
    specialty: 'Cardiología',
    practitioner: 'Dr. María Silva',
    facility: 'Hospital Regional Iquique',
    type: 'Consulta',
    diagnosis: 'Evaluación cardiovascular preventiva',
    notes: 'Electrocardiograma dentro de parámetros normales. Sin hallazgos significativos.',
  },
  {
    id: '3',
    date: '20 Febrero 2026',
    specialty: 'Traumatología',
    practitioner: 'Dr. Roberto Mendez',
    facility: 'CESFAM Norte',
    type: 'Procedimiento',
    diagnosis: 'Evaluación de lesión en rodilla derecha',
    notes: 'Se solicita resonancia magnética. Reposo relativo y terapia física.',
  },
];

export function HistoryView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Historial Médico</h2>
        <p className="text-gray-600">Registro completo de tus atenciones médicas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Atenciones</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHistory.length}</div>
            <p className="text-xs text-gray-600">Últimos 12 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Consulta</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Abril</div>
            <p className="text-xs text-gray-600">Medicina Interna</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Especialidades</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Diferentes especialistas</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockHistory.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <FileText className="h-7 w-7 text-white" />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{record.specialty}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {record.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{record.practitioner}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{record.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{record.facility}</span>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Diagnóstico:</p>
                      <p className="text-sm text-gray-900">{record.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Observaciones:</p>
                      <p className="text-sm text-gray-900">{record.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
