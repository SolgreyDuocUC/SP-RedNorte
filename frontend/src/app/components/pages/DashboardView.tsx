import { Calendar, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Bienvenido, Juan</h2>
        <p className="text-gray-600">Aquí está el resumen de tu atención médica</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Mayo</div>
            <p className="text-xs text-gray-600">Cardiología - 10:00 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Lista de Espera</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Traumatología, Oftalmología</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-600">Confirmación requerida</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Consultas completadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Citas Médicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Cardiología</h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Confirmada
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Dr. María Silva</p>
                <p className="text-sm text-gray-500">15 Mayo 2026 - 10:00 AM</p>
                <p className="text-sm text-gray-500">Hospital Regional Iquique</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Control General</h4>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    Pendiente
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Dr. Carlos Rojas</p>
                <p className="text-sm text-gray-500">22 Mayo 2026 - 15:30 PM</p>
                <p className="text-sm text-gray-500">CESFAM Norte</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado en Listas de Espera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Traumatología</h4>
                <Badge className="bg-amber-600">Prioridad Media</Badge>
              </div>
              <p className="text-sm text-gray-600">Lesión de rodilla</p>
              <p className="text-sm text-gray-500">Hospital Regional Iquique</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">Ingresado: 1 Abril 2026</span>
                <span className="text-xs font-medium text-blue-600">~45 días</span>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Oftalmología</h4>
                <Badge className="bg-green-600">Prioridad Baja</Badge>
              </div>
              <p className="text-sm text-gray-600">Control de rutina</p>
              <p className="text-sm text-gray-500">Clínica Especializada Norte</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">Ingresado: 15 Abril 2026</span>
                <span className="text-xs font-medium text-blue-600">~60 días</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recordatorios Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Confirma tu cita de Control General</p>
              <p className="text-sm text-blue-700">Por favor confirma tu asistencia antes del 20 de Mayo</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
            <Calendar className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Recordatorio de exámenes previos</p>
              <p className="text-sm text-green-700">Recuerda traer resultados de laboratorio a tu próxima cita</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
