import { Calendar, Clock, MapPin, User, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const mockAppointments = [
  {
    id: '1',
    specialty: 'Cardiología',
    practitioner: 'Dr. María Silva',
    date: '15 Mayo 2026',
    time: '10:00 AM',
    facility: 'Hospital Regional Iquique',
    status: 'confirmed',
    type: 'consultation',
  },
  {
    id: '2',
    specialty: 'Control General',
    practitioner: 'Dr. Carlos Rojas',
    date: '22 Mayo 2026',
    time: '15:30 PM',
    facility: 'CESFAM Norte',
    status: 'scheduled',
    type: 'followup',
  },
];

const pastAppointments = [
  {
    id: '3',
    specialty: 'Medicina Interna',
    practitioner: 'Dra. Ana Torres',
    date: '15 Abril 2026',
    time: '11:00 AM',
    facility: 'Hospital Regional Iquique',
    status: 'completed',
    type: 'consultation',
  },
];

const statusStyles = {
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  scheduled: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-gray-50 text-gray-700 border-gray-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const statusLabels = {
  confirmed: 'Confirmada',
  scheduled: 'Agendada',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

export function AppointmentsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Mis Citas Médicas</h2>
          <p className="text-gray-600">Gestiona tus citas médicas programadas</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
          <TabsTrigger value="past">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Calendar className="h-7 w-7 text-white" />
                    </div>

                    <div className="space-y-3 flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{appointment.specialty}</h3>
                          <Badge
                            variant="outline"
                            className={statusStyles[appointment.status as keyof typeof statusStyles]}
                          >
                            {statusLabels[appointment.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{appointment.practitioner}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span>{appointment.facility}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {appointment.status === 'scheduled' && (
                          <Button size="sm" variant="outline" className="text-green-700 border-green-300 hover:bg-green-50">
                            Confirmar Asistencia
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reagendar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-700 border-red-300 hover:bg-red-50">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem>Descargar comprobante</DropdownMenuItem>
                      <DropdownMenuItem>Agregar a calendario</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <Calendar className="h-7 w-7 text-gray-600" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{appointment.specialty}</h3>
                          <Badge
                            variant="outline"
                            className={statusStyles[appointment.status as keyof typeof statusStyles]}
                          >
                            {statusLabels[appointment.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{appointment.practitioner}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.facility}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    Ver Resumen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
