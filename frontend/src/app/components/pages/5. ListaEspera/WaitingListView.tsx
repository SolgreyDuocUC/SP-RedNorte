import { Clock, AlertCircle, Hospital, Calendar, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { mockEntries } from '../../../../mocks/mockEntries';
import { priorityConfig } from '../../../../imports/priorityConfig';

export function WaitingListView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#023e8a]">Lista de Espera</h2>
        <p className="text-sm text-muted-foreground">Seguimiento de tus solicitudes médicas pendientes</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total en Espera</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">2</div>
            <p className="text-xs text-muted-foreground mt-1">Solicitudes activas</p>
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
            <p className="text-xs text-muted-foreground mt-1">Estimación actual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prioridad Alta</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
              <AlertCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">0</div>
            <p className="text-xs text-muted-foreground mt-1">Sin casos urgentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {mockEntries.map((entry) => {
          const progress = Math.min((entry.elapsedDays / entry.estimatedDays) * 100, 100);
          const pCfg = priorityConfig[entry.priority as keyof typeof priorityConfig];

          return (
            <Card key={entry.id}>
              <CardContent className="p-5 space-y-4">
                {/* Top row */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#023e8a]">{entry.specialty}</h3>
                      <Badge className={`${pCfg.classes} border-0 hover:${pCfg.classes}`}>
                        {pCfg.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{entry.diagnosis}</p>

                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Hospital className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{entry.facility}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-0.5">
                      <span>
                        Ingreso: <span className="font-medium text-slate-700">{entry.entryDate}</span>
                      </span>
                      <span>
                        Transcurrido: <span className="font-medium text-slate-700">{entry.elapsedDays} días</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progreso estimado</span>
                    <span className="font-semibold text-primary">
                      {entry.elapsedDays} / {entry.estimatedDays} días
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>

                {/* Info notice */}
                <div className="flex items-start gap-2.5 rounded-xl bg-secondary p-3.5">
                  <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-[#023e8a]">Estado actual: En espera</p>
                    <p className="text-[#0096c7]">
                      Tiempo estimado restante: ~{entry.estimatedDays - entry.elapsedDays} días.
                      Te notificaremos cuando se asigne una hora disponible.
                    </p>
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
