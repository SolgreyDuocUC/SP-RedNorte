import {
  CheckCircle2, Calendar, Clock, UserCheck,
  Hash, ArrowRight, Phone, Mail, Zap, Monitor,
} from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import { doctorInitials } from '../../../../core/constants/BookingConst';

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
  const patientIni     = `${data.firstName?.[0] ?? ''}${data.lastName?.[0] ?? ''}`.toUpperCase();
  const doctorIni      = doctorInitials(data.doctorName ?? '');
  const isTelemedicina = data.appointmentType === 'TELEMEDICINA';

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
      <div className="w-full bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden text-left">

        {/* Paciente */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-full bg-[#0b3c5d] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {patientIni || '?'}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0b3c5d]">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-xs text-slate-400">
              {data.identifier} · {data.prevision}
            </p>
          </div>
        </div>

        {/* Datos de contacto */}
        {(data.phone || data.email) && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 px-5 py-3 border-b border-slate-100">
            {data.phone && (
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Phone size={11} className="text-slate-400" /> {data.phone}
              </span>
            )}
            {data.email && (
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Mail size={11} className="text-slate-400" /> {data.email}
              </span>
            )}
          </div>
        )}

        {/* Filas de la cita */}
        {[
          {
            icon: isTelemedicina ? <Monitor size={15} /> : <Zap size={15} />,
            label: 'Modalidad',
            value: isTelemedicina ? 'Telemedicina' : 'Presencial',
          },
          {
            icon: <Calendar size={15} />,
            label: 'Fecha',
            value: data.dateLabel ?? '—',
          },
          {
            icon: <Clock size={15} />,
            label: 'Hora',
            value: data.slot ? `${data.slot} hrs` : '—',
          },
        ].map(({ icon, label, value }, i, arr) => (
          <div key={label}>
            <div className="flex items-center justify-between px-5 py-2.5">
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-slate-400">{icon}</span>
                {label}
              </span>
              <span className="text-sm font-semibold text-[#0b3c5d]">{value}</span>
            </div>
            {i < arr.length - 1 && <hr className="border-slate-100 mx-5" />}
          </div>
        ))}

        {/* Médico */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-slate-100">
          <div className="w-9 h-9 rounded-full bg-[#1d7874] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {doctorIni || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0b3c5d] truncate">{data.doctorName ?? '—'}</p>
            {data.doctorTitle && (
              <p className="text-xs text-slate-400">{data.doctorTitle}</p>
            )}
          </div>
          <span className="shrink-0">
            <UserCheck size={16} className="text-[#1d7874]" />
          </span>
        </div>

        {/* Código de reserva */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#eaf8ff] border-t border-[#c8edf8]">
          <span className="flex items-center gap-2 text-sm text-[#0b3c5d] font-medium">
            <Hash size={15} className="text-[#5bc0eb]" /> N° de reserva
          </span>
          <span className="text-sm font-bold text-[#0b3c5d] font-mono tracking-wide">
            {bookingCode}
          </span>
        </div>
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
