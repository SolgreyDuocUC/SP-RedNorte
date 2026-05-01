import { Bell, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const mockNotifications = [
  {
    id: '1',
    type: 'appointment-reminder',
    title: 'Recordatorio de Cita',
    message: 'Tu cita de Cardiología con Dr. María Silva es mañana a las 10:00 AM',
    date: '29 Abril 2026',
    time: '14:30',
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'waiting-list-update',
    title: 'Actualización Lista de Espera',
    message: 'Tu solicitud de Traumatología ha sido priorizada. Tiempo estimado: 30 días',
    date: '28 Abril 2026',
    time: '11:15',
    isRead: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'appointment-scheduled',
    title: 'Cita Agendada',
    message: 'Se ha agendado tu cita de Control General para el 22 de Mayo a las 15:30 PM',
    date: '27 Abril 2026',
    time: '09:20',
    isRead: true,
    priority: 'low',
  },
  {
    id: '4',
    type: 'reassignment-offer',
    title: 'Hora Disponible',
    message: 'Se ha liberado una hora para Oftalmología el 5 de Mayo. ¿Deseas tomarla?',
    date: '26 Abril 2026',
    time: '16:45',
    isRead: true,
    priority: 'high',
  },
];

const typeIcons = {
  'appointment-reminder': Calendar,
  'waiting-list-update': Clock,
  'appointment-scheduled': CheckCircle,
  'reassignment-offer': Bell,
  general: AlertCircle,
};

const typeStyles = {
  'appointment-reminder': 'from-blue-500 to-cyan-500',
  'waiting-list-update': 'from-amber-500 to-orange-500',
  'appointment-scheduled': 'from-green-500 to-emerald-500',
  'reassignment-offer': 'from-purple-500 to-pink-500',
  general: 'from-gray-500 to-slate-500',
};

export function NotificationsView() {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Notificaciones</h2>
          <p className="text-gray-600">
            Tienes {unreadCount} notificación{unreadCount !== 1 ? 'es' : ''} sin leer
          </p>
        </div>
        <Badge className="bg-blue-600">{unreadCount} nuevas</Badge>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            Todas ({mockNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            No leídas ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Leídas ({mockNotifications.length - unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {mockNotifications.map((notification) => {
            const Icon = typeIcons[notification.type as keyof typeof typeIcons] || Bell;
            const gradientStyle = typeStyles[notification.type as keyof typeof typeStyles];

            return (
              <Card
                key={notification.id}
                className={!notification.isRead ? 'border-l-4 border-l-blue-600' : ''}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradientStyle}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-gray-900">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <span className="ml-2 flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{notification.date}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="unread" className="space-y-3">
          {mockNotifications
            .filter((n) => !n.isRead)
            .map((notification) => {
              const Icon = typeIcons[notification.type as keyof typeof typeIcons] || Bell;
              const gradientStyle = typeStyles[notification.type as keyof typeof typeStyles];

              return (
                <Card key={notification.id} className="border-l-4 border-l-blue-600">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradientStyle}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">
                          {notification.date} • {notification.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="read" className="space-y-3">
          {mockNotifications
            .filter((n) => n.isRead)
            .map((notification) => {
              const Icon = typeIcons[notification.type as keyof typeof typeIcons] || Bell;
              const gradientStyle = typeStyles[notification.type as keyof typeof typeStyles];

              return (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradientStyle} opacity-60`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-700 mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">
                          {notification.date} • {notification.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
