import { Clock, AlertCircle, Hospital, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const mockEntries = [
  {
    id: '1',
    specialty: 'Traumatología',
    diagnosis: 'Lesión de rodilla',
    facility: 'Hospital Regional Iquique',
    priority: 'medium',
    entryDate: '1 Abril 2026',
    estimatedDays: 45,
    elapsedDays: 29,
    status: 'waiting',
  },
  {
    id: '2',
    specialty: 'Oftalmología',
    diagnosis: 'Control de rutina',
    facility: 'Clínica Especializada Norte',
    priority: 'low',
    entryDate: '15 Abril 2026',
    estimatedDays: 60,
    elapsedDays: 15,
    status: 'waiting',
  },
];

const priorityStyles = {
  urgent: 'bg-red-600',
  high: 'bg-orange-600',
  medium: 'bg-amber-600',
  low: 'bg-green-600',
};

const priorityLabels = {
  urgent: 'Urgente',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export function WaitingListView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Lista de Espera</h2>
        <p className="text-gray-600">Seguimiento de tus solicitudes médicas pendientes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total en Espera</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Solicitudes activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Calendar className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52 días</div>
            <p className="text-xs text-gray-600">Estimación actual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prioridad Alta</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-600">Sin casos urgentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockEntries.map((entry) => {
          const progress = (entry.elapsedDays / entry.estimatedDays) * 100;

          return (
            <Card key={entry.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                        <Clock className="h-7 w-7 text-white" />
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{entry.specialty}</h3>
                            <Badge className={priorityStyles[entry.priority as keyof typeof priorityStyles]}>
                              {priorityLabels[entry.priority as keyof typeof priorityLabels]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{entry.diagnosis}</p>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Hospital className="h-4 w-4 text-blue-600" />
                          <span>{entry.facility}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">
                            Ingreso: <span className="font-medium text-gray-900">{entry.entryDate}</span>
                          </span>
                          <span className="text-gray-600">
                            Tiempo transcurrido: <span className="font-medium text-gray-900">{entry.elapsedDays} días</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progreso estimado</span>
                      <span className="font-medium text-blue-600">
                        {entry.elapsedDays} / {entry.estimatedDays} días
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="rounded-lg bg-blue-50 p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900">Estado actual: En espera</p>
                        <p className="text-blue-700">
                          Tiempo estimado restante: aproximadamente {entry.estimatedDays - entry.elapsedDays} días.
                          Te notificaremos cuando se asigne una hora disponible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
