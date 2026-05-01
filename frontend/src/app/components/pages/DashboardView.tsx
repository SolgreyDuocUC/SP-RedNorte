import { Calendar, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-semibold text-[#023e8a]">Bienvenido, Juan</h2>
        <p className="text-muted-foreground text-sm">Aquí está el resumen de tu atención médica</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Próxima Cita</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">15 Mayo</div>
            <p className="text-xs text-muted-foreground mt-1">Cardiología · 10:00 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En Lista de Espera</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">2</div>
            <p className="text-xs text-muted-foreground mt-1">Traumatología, Oftalmología</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">1</div>
            <p className="text-xs text-muted-foreground mt-1">Confirmación requerida</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Este Mes</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">3</div>
            <p className="text-xs text-muted-foreground mt-1">Consultas completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Upcoming appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#023e8a]">Próximas Citas Médicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-4 rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-[#023e8a]">Cardiología</h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 shrink-0">
                    Confirmada
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Dr. María Silva</p>
                <p className="text-xs text-muted-foreground mt-0.5">15 Mayo 2026 · 10:00 AM · Hospital Regional Iquique</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                <Calendar className="h-5 w-5 text-[#023e8a]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-[#023e8a]">Control General</h4>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 shrink-0">
                    Pendiente
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Dr. Carlos Rojas</p>
                <p className="text-xs text-muted-foreground mt-0.5">22 Mayo 2026 · 15:30 PM · CESFAM Norte</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waiting list status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#023e8a]">Estado en Listas de Espera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#023e8a]">Traumatología</h4>
                <Badge className="bg-amber-100 text-amber-800 border-0 hover:bg-amber-100">Prioridad Media</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Lesión de rodilla</p>
              <p className="text-xs text-muted-foreground">Hospital Regional Iquique</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Ingresado: 1 Abril 2026</span>
                <span className="text-xs font-semibold text-primary">~45 días</span>
              </div>
            </div>

            <div className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#023e8a]">Oftalmología</h4>
                <Badge className="bg-green-100 text-green-800 border-0 hover:bg-green-100">Prioridad Baja</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Control de rutina</p>
              <p className="text-xs text-muted-foreground">Clínica Especializada Norte</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Ingresado: 15 Abril 2026</span>
                <span className="text-xs font-semibold text-primary">~60 días</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#023e8a]">Recordatorios Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl bg-secondary p-3.5">
            <AlertCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-[#023e8a] text-sm">Confirma tu cita de Control General</p>
              <p className="text-sm text-[#0096c7]">Por favor confirma tu asistencia antes del 20 de Mayo</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-green-50 p-3.5">
            <Calendar className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 text-sm">Recordatorio de exámenes previos</p>
              <p className="text-sm text-green-700">Recuerda traer resultados de laboratorio a tu próxima cita</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
