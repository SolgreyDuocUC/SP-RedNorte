import { CheckCircle2, Calendar, Clock, UserCheck, Hash, ArrowRight } from 'lucide-react';
import { BookingData } from '../../../types/Booking';

interface BookingSuccessProps {
  data: Partial<BookingData>;
  bookingCode: string;
  onViewAppointments: () => void;
  onNewBooking: () => void;
}

export function BookingSuccess({
  data,
  bookingCode,
  onViewAppointments,
  onNewBooking,
}: BookingSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      {/* Ícono éxito */}
      <div className="w-16 h-16 rounded-full bg-[#e6f7f4] flex items-center justify-center">
        <CheckCircle2 size={36} className="text-[#1d7874]" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-[#0b3c5d]">¡Reserva confirmada!</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
          Tu hora ha sido agendada exitosamente. Recibirás un correo y SMS con los detalles.
        </p>
      </div>

      {/* Detalle reserva */}
      <div className="w-full bg-slate-50 rounded-2xl px-5 py-1 border border-slate-100 text-left">
        {[
          { icon: <Calendar size={15} />,   label: 'Fecha',      value: data.dateLabel    ?? '—' },
          { icon: <Clock size={15} />,      label: 'Hora',       value: data.slot ? `${data.slot} hrs` : '—' },
          { icon: <UserCheck size={15} />,  label: 'Médico',     value: data.doctorName   ?? '—' },
          { icon: <Hash size={15} />,       label: 'N° reserva', value: bookingCode },
        ].map(({ icon, label, value }, i, arr) => (
          <div key={label}>
            <div className="flex items-center justify-between py-2.5">
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-slate-400">{icon}</span>
                {label}
              </span>
              <span className="text-sm font-semibold text-[#0b3c5d]">{value}</span>
            </div>
            {i < arr.length - 1 && <hr className="border-slate-100" />}
          </div>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
        <button
          onClick={onViewAppointments}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b3c5d] text-white text-base font-bold hover:bg-[#0e4d76] transition-all shadow-md"
        >
          Ver mis horas agendadas <ArrowRight size={20} />
        </button>
        <button
          onClick={onNewBooking}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-300 text-base font-bold text-slate-600 hover:bg-slate-50 transition-all"
        >
          Agendar otra hora
        </button>
      </div>
    </div>
  );
}