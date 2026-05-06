import { ArrowLeft, Check, Bell, User, Stethoscope, Building2, Calendar, Clock, UserCheck } from 'lucide-react';
import { BookingData } from '../../../types/Booking';

interface Step4ConfirmarProps {
  data: Partial<BookingData>;
  onConfirm: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SummaryRow({ icon, label, value }: SummaryRowProps) {
  return (
    <>
      <div className="flex items-center justify-between py-2.5">
        <span className="flex items-center gap-2 text-sm text-slate-500">
          <span className="text-slate-400">{icon}</span>
          {label}
        </span>
        <span className="text-sm font-semibold text-[#0b3c5d]">{value}</span>
      </div>
      <hr className="border-slate-100 last:hidden" />
    </>
  );
}

export function Step4Confirmar({ data, onConfirm, onBack, isLoading = false }: Step4ConfirmarProps) {
  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    {
      icon:  <User size={15} />,
      label: 'Paciente',
      value: `${data.identifier ?? '—'} · ${data.prevision ?? '—'}`,
    },
    {
      icon:  <Stethoscope size={15} />,
      label: 'Especialidad',
      value: data.specialtyName ?? '—',
    },
    {
      icon:  <Building2 size={15} />,
      label: 'Centro',
      value: data.centerName ?? '—',
    },
    {
      icon:  <Calendar size={15} />,
      label: 'Fecha',
      value: data.dateLabel ?? '—',
    },
    {
      icon:  <Clock size={15} />,
      label: 'Hora',
      value: data.slot ? `${data.slot} hrs` : '—',
    },
    {
      icon:  <UserCheck size={15} />,
      label: 'Médico',
      value: data.doctorName ?? '—',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <Check size={13} /> Paso 4 de 4
        </p>
        <h2 className="text-xl font-semibold text-[#0b3c5d]">Confirma tu reserva</h2>
        <p className="text-sm text-slate-500 mt-1">
          Revisa los datos antes de confirmar. Recibirás una notificación de confirmación.
        </p>
      </div>

      <hr className="border-slate-100" />

      {/* Resumen */}
      <div className="bg-slate-50 rounded-2xl px-5 py-1 border border-slate-100">
        {rows.map((row, i) => (
          <SummaryRow key={i} {...row} />
        ))}
      </div>

      {/* Aviso notificación */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e6f7f4] border border-[#9fe1cb]">
        <Bell size={18} className="text-[#1d7874] shrink-0" />
        <p className="text-sm text-[#085041] font-medium">
          Se enviará una confirmación por correo y SMS al confirmar.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
        >
          <ArrowLeft size={15} /> Volver
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#1d7874] text-white hover:bg-[#0f6e56] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Confirmando...
            </>
          ) : (
            <>
              <Check size={15} /> Confirmar reserva
            </>
          )}
        </button>
      </div>
    </div>
  );
}