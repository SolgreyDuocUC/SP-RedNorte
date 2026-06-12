import {
  CheckCircle2, Calendar, Clock, UserCheck,
  Hash, ArrowRight, Phone, Mail, Zap, Monitor, Sparkles
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
    <div className="flex flex-col items-center text-center gap-6 py-2 max-w-md mx-auto animate-fadeIn">
      {/* Ícono de éxito animado */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40 scale-125" />
        <div className="w-20 h-20 rounded-full bg-[#e6f7f4] flex items-center justify-center relative shadow-sm border border-[#9fe1cb]">
          <CheckCircle2 size={44} className="text-[#1d7874]" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#0b3c5d] tracking-tight flex items-center justify-center gap-1.5">
          ¡Reserva Confirmada! <Sparkles size={18} className="text-[#5bc0eb]" />
        </h2>
        <p className="text-sm text-slate-500 mt-2 px-4 leading-relaxed">
          Tu atención médica ha sido agendada con éxito. Ya enviamos las instrucciones a tus canales de contacto.
        </p>
      </div>

      {/* Tarjeta estilo Comprobante / Ticket */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden text-left relative">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#1d7874]" />
        
        {/* Código de reserva (Destacado arriba para lectura rápida) */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-100">
          <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Hash size={14} className="text-[#5bc0eb]" /> Identificador de Cita
          </span>
          <span className="text-base font-black text-[#0b3c5d] font-mono tracking-wider bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            {bookingCode}
          </span>
        </div>

        {/* Datos del Paciente */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-white">
          <div className="w-10 h-10 rounded-full bg-[#0b3c5d] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
            {patientIni || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#0b3c5d] capitalize truncate">
              {data.firstName?.toLowerCase()} {data.lastName?.toLowerCase()}
            </p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {data.identifier} <span className="text-slate-300 mx-1">·</span> {data.prevision}
            </p>
          </div>
        </div>

        {/* Datos de contacto (Fondo sutil de verificación) */}
        {(data.phone || data.email) && (
          <div className="flex flex-col gap-1.5 px-5 py-3 bg-slate-50/50 border-b border-slate-100 text-slate-600 font-mono text-[11px]">
            {data.phone && (
              <span className="flex items-center gap-2">
                <Phone size={12} className="text-slate-400" /> {data.phone}
              </span>
            )}
            {data.email && (
              <span className="flex items-center gap-2 truncate">
                <Mail size={12} className="text-slate-400" /> {data.email}
              </span>
            )}
          </div>
        )}

        {/* Bloque Detalle de Cita */}
        <div className="p-2 bg-white">
          {[
            {
              icon: isTelemedicina ? <Monitor size={15} /> : <Zap size={15} />,
              label: 'Modalidad de atención',
              value: isTelemedicina ? 'Telemedicina' : 'Presencial en Sucursal',
              color: isTelemedicina ? 'text-indigo-600 bg-indigo-50' : 'text-amber-600 bg-amber-50'
            },
            {
              icon: <Calendar size={15} />,
              label: 'Fecha asignada',
              value: data.dateLabel ?? '—',
            },
            {
              icon: <Clock size={15} />,
              label: 'Horario',
              value: data.slot ? `${data.slot} hrs` : '—',
            },
          ].map(({ icon, label, value, color }, i) => (
            <div key={label} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <span className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                <span className="text-slate-400 shrink-0">{icon}</span>
                {label}
              </span>
              <span className={`text-sm font-bold text-[#0b3c5d] px-2 py-0.5 rounded-md ${color ?? ''}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Datos del Especialista */}
        <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 border-t border-slate-100">
          <div className="w-10 h-10 rounded-full bg-[#1d7874] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
            {doctorIni || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#0b3c5d] truncate">{data.doctorName ?? '—'}</p>
            <p className="text-xs text-[#1d7874] font-medium mt-0.5 bg-[#1d7874]/5 px-1.5 py-0.5 rounded inline-block">
              {data.doctorTitle || 'Médico Asignado'}
            </p>
          </div>
          <span className="shrink-0 bg-emerald-100 p-1.5 rounded-full">
            <UserCheck size={16} className="text-[#1d7874]" />
          </span>
        </div>
      </div>

      {/* Botones de acción organizados por jerarquía */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-3">
        <button
          type="button"
          onClick={onViewAppointments}
          className="flex-1 order-1 sm:order-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b3c5d] text-white text-base font-bold hover:bg-[#0e4d76] active:scale-[0.99] transition-all shadow-md cursor-pointer select-none"
        >
          Volver al menú principal <ArrowRight size={18} />
        </button>
        
        <button
          type="button"
          onClick={onNewBooking}
          className="flex-1 order-2 sm:order-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all cursor-pointer select-none shadow-sm"
        >
          Agendar otra hora
        </button>
      </div>
    </div>
  );
}