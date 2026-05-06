import {
  ArrowLeft, Check, Bell,
  Stethoscope, Building2, Calendar, Clock,
  Phone, Mail, Zap, Monitor,
} from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import { doctorInitials } from '../../../../core/constants/BookingConst';

interface Step4ConfirmarProps {
  data: Partial<BookingData>;
  onConfirm: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
  const patientIni = `${data.firstName?.[0] ?? ''}${data.lastName?.[0] ?? ''}`.toUpperCase();
  const doctorIni  = doctorInitials(data.doctorName ?? '');

  const isTelemedicina = data.appointmentType === 'TELEMEDICINA';

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <Check size={13} /> Paso 4 de 4
        </p>
        <h2 className="text-xl font-semibold text-[#0b3c5d]">Confirma tu reserva</h2>
        <p className="text-sm text-slate-500 mt-1">
          Revisa todos los datos antes de confirmar.
        </p>
      </div>

      <hr className="border-slate-100" />

      {/* ── Tarjeta paciente ── */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Paciente</p>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#0b3c5d] text-white flex items-center justify-center text-sm font-bold shrink-0">
            {patientIni || '?'}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0b3c5d]">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-xs text-slate-500">
              {data.identifier} · {data.prevision}
            </p>
          </div>
        </div>

        {(data.phone || data.email) && (
          <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
            {data.phone && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Phone size={11} className="text-slate-400" /> {data.phone}
              </p>
            )}
            {data.email && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Mail size={11} className="text-slate-400" /> {data.email}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Detalles de la cita ── */}
      <div className="bg-slate-50 rounded-2xl px-5 py-1 border border-slate-100">
        <SummaryRow
          icon={isTelemedicina ? <Monitor size={15} /> : <Zap size={15} />}
          label="Modalidad"
          value={isTelemedicina ? 'Telemedicina' : 'Presencial'}
        />
        <SummaryRow
          icon={<Stethoscope size={15} />}
          label="Especialidad"
          value={data.specialtyName ?? '—'}
        />
        <SummaryRow
          icon={<Building2 size={15} />}
          label="Centro"
          value={data.centerName ?? '—'}
        />
        <SummaryRow
          icon={<Calendar size={15} />}
          label="Fecha"
          value={data.dateLabel ?? '—'}
        />
        <SummaryRow
          icon={<Clock size={15} />}
          label="Hora"
          value={data.slot ? `${data.slot} hrs` : '—'}
        />
      </div>

      {/* ── Tarjeta profesional ── */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Profesional asignado</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1d7874] text-white flex items-center justify-center text-sm font-bold shrink-0">
            {doctorIni || '?'}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0b3c5d]">{data.doctorName ?? '—'}</p>
            {data.doctorTitle && (
              <p className="text-xs text-slate-500">{data.doctorTitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Aviso notificación */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e6f7f4] border border-[#9fe1cb]">
        <Bell size={18} className="text-[#1d7874] shrink-0" />
        <p className="text-sm text-[#085041] font-medium">
          Se enviará una confirmación por correo y SMS al confirmar.
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 text-base font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-all"
        >
          <ArrowLeft size={20} /> Ajustar Fecha/Hora
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-[#1d7874] text-white hover:bg-[#0f6e56] disabled:opacity-60 disabled:cursor-not-allowed shadow-md transition-all"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Confirmando...
            </>
          ) : (
            <>
              <Check size={20} /> Confirmar mi reserva
            </>
          )}
        </button>
      </div>
    </div>
  );
}
