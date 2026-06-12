import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Search, ShieldAlert, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { appointmentsRemote } from '../../remotes/appointments.remote';
import type { AppointmentDTO } from '../../remotes/dtos/appointment.dto';
import { validateRun, formatRun } from '../../core/constants/BookingConst';

interface PatientAppointmentsPanelProps {
  onReagenda?: (app: AppointmentDTO) => void;
}

export function PatientAppointmentsPanel({ onReagenda }: PatientAppointmentsPanelProps) {
  const [run, setRun] = useState('');
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Modal para cancelar
  const [cancelApp, setCancelApp] = useState<AppointmentDTO | null>(null);
  const [cancelCode, setCancelCode] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!run) return;
    setLoading(true);
    try {
      const data = await appointmentsRemote.getByPatient(run);
      // Solo mostramos las que no estén canceladas en el portal público, o todas si queremos que vean el historial
      setAppointments(data.filter(a => a.status !== 'cancelled' && a.status !== 'noshow'));
      setSearched(true);
    } catch (error) {
      toast.error('Error al buscar', { description: 'Verifique su RUN y vuelva a intentar.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubmit = async () => {
    if (!cancelApp) return;
    if (cancelCode !== cancelApp.id) {
      toast.error('Código incorrecto', { description: 'El código ingresado no coincide con la reserva.' });
      return;
    }
    try {
      await appointmentsRemote.cancel(cancelApp.id!);
      toast.success('Hora cancelada exitosamente', { description: 'La disponibilidad ha sido liberada.' });
      setCancelApp(null);
      setCancelCode('');
      // Refrescar lista
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    } catch (error) {
      toast.error('Error al cancelar', { description: 'Comuníquese con administración.' });
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm space-y-6">
      {!searched ? (
        <div className="max-w-md mx-auto py-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[#023e8a] mb-2">Consulta tus Reservas</h3>
            <p className="text-sm text-gray-500">Ingresa tu RUN para ver, modificar o cancelar tus horas médicas agendadas.</p>
          </div>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ej. 12345678-9 o pat-2024-001"
                required
                value={run}
                onChange={(e) => setRun(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#0096c7]/30 focus:border-[#0096c7] transition"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl bg-[#0096c7] text-white text-base font-bold hover:bg-[#0077b6] transition shadow-sm disabled:opacity-70"
            >
              {loading ? 'Buscando...' : 'Buscar mis horas'}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#023e8a]">Tus horas vigentes</h3>
            <button onClick={() => setSearched(false)} className="text-sm text-[#0096c7] hover:underline">Volver a buscar</button>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-500">No se encontraron horas médicas vigentes para este RUN.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map(app => {
                const startDate = new Date(app.start);
                return (
                  <div key={app.id} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold mb-2">
                          {app.specialty}
                        </span>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                          <Calendar className="w-4 h-4 text-[#0096c7]" />
                          {startDate.toLocaleDateString()} a las {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 opacity-70" /> Profesional ID: {app.practitionerId}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 opacity-70" /> RedNorte Central
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setCancelApp(app)}
                        className="flex-1 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition"
                      >
                        Cancelar Hora
                      </button>
                      <button 
                        onClick={() => {
                          if (onReagenda) {
                            onReagenda(app);
                          } else {
                            toast.info('Reagendamiento', { description: 'Debes cancelar tu hora primero para liberar el cupo, y luego agendar una nueva.' });
                          }
                        }}
                        className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                      >
                        Modificar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cancelApp && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
                <ShieldAlert className="w-12 h-12 text-red-500 mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-center mb-2">Confirmar Cancelación</h4>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Para cancelar tu hora de {cancelApp.specialty}, por favor ingresa el Código de Reserva que recibiste en tu comprobante o correo.
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Código de Reserva (Ej. UUID)"
                    value={cancelCode}
                    onChange={(e) => setCancelCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none font-mono"
                  />
                  <div className="flex gap-3">
                    <button onClick={() => { setCancelApp(null); setCancelCode(''); }} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                      Cerrar
                    </button>
                    <button onClick={handleCancelSubmit} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700">
                      Confirmar
                    </button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500 mb-3">¿No tienes tu código o necesitas ayuda?</p>
                  <a href="tel:6003607777" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition">
                    <Phone className="w-4 h-4" /> Comunicarse con Soporte
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
