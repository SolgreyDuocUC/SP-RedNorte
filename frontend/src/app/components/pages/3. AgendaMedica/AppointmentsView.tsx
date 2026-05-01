import { Calendar, Clock, MapPin, User, MoreVertical, Plus } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { toast } from 'sonner';
import {pastAppointments, statusConfig } from '../../../../imports/apoimentsIcon';
import { mockAppointments} from '../../../../mocks/mockAppointments';


function AppointmentCard({ appointment, isPast = false }: { appointment: typeof mockAppointments[0]; isPast?: boolean }) {
  const status = statusConfig[appointment.status as keyof typeof statusConfig];

  const handleConfirm = () =>
    toast.success('Asistencia confirmada', {
      description: `Tu cita de ${appointment.specialty} ha sido confirmada.`,
    });

  const handleReschedule = () =>
    toast.info('Reagendando cita', {
      description: 'Pronto podrás seleccionar una nueva fecha disponible.',
    });

  const handleCancel = () =>
    toast.error('Cita cancelada', {
      description: `Tu cita de ${appointment.specialty} fue cancelada.`,
    });

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                isPast
                  ? 'bg-slate-100'
                  : 'bg-gradient-to-br from-[#0096c7] to-[#023e8a]'
              }`}
            >
              <Calendar className={`h-6 w-6 ${isPast ? 'text-slate-400' : 'text-white'}`} />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-[#023e8a]">{appointment.specialty}</h3>
                <Badge variant="outline" className={status.classes}>
                  {status.label}
                </Badge>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{appointment.practitioner}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {appointment.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {appointment.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {appointment.facility}
                </span>
              </div>

              {!isPast && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {appointment.status === 'scheduled' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-700 border-green-300 hover:bg-green-50 text-xs"
                      onClick={handleConfirm}
                    >
                      Confirmar Asistencia
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={handleReschedule}
                  >
                    Reagendar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive/30 hover:bg-destructive/5 text-xs"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Options menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-slate-400 hover:text-primary">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast('Abriendo detalles...')}>
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success('Comprobante descargado')}>
                Descargar comprobante
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success('Agregado al calendario')}>
                Agregar a calendario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export function AppointmentsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#023e8a]">Mis Citas Médicas</h2>
          <p className="text-sm text-muted-foreground">Gestiona tus citas médicas programadas</p>
        </div>
        <Button
          className="bg-primary hover:bg-[#0077b6] text-white gap-2"
          onClick={() => toast.info('Nueva cita', { description: 'Redirigiendo al formulario de agendamiento...' })}
        >
          <Plus className="h-4 w-4" />
          Nueva Cita
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-[#023e8a]">
            Próximas Citas
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:text-[#023e8a]">
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-3">
          {mockAppointments.map((a) => (
            <AppointmentCard key={a.id} appointment={a} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-3">
          {pastAppointments.map((a) => (
            <AppointmentCard key={a.id} appointment={a} isPast />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
