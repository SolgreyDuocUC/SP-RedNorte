import {
  ArrowLeft, Check, Bell,
  Stethoscope, Building2, Calendar, Clock,
  Phone, Mail, Zap, Monitor, Sparkles
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
    <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-slate-50/80 transition-colors">
      <span className="flex items-center gap-2.5 text-sm text-slate-500 font-medium">
        <span className="text-[#5bc0eb]">{icon}</span>
        {label}
      </span>
      <span className="text-sm font-semibold text-[#0b3c5d] bg-white px-3 py-1 rounded-md shadow-sm border border-slate-100">
        {value}
      </span>
    </div>
  );
}

export function Step4Confirmar({ data, onConfirm, onBack, isLoading = false }: Step4ConfirmarProps) {
  const patientIni = `${data.firstName?.[0] ?? ''}${data.lastName?.[0] ?? ''}`.toUpperCase();
  const doctorIni  = doctorInitials(data.doctorName ?? '');

  const isTelemedicina = data.appointmentType === 'TELEMEDICINA';

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="relative">
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <Sparkles size={12} className="animate-pulse" /> Último Paso · Confirmación
        </p>
        <h2 className="text-2xl font-bold text-[#0b3c5d] tracking-tight">Verifica los datos de tu cita</h2>
        <p className="text-sm text-slate-500 mt-1">
          Por favor, asegúrate de que toda la información sea correcta antes de agendar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ── Columna Izquierda: Paciente y Médico ── */}
        <div className="flex flex-col gap-4">
          {/* Tarjeta Paciente */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0b3c5d]" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Paciente Titular</p>
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0b3c5d] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
                {patientIni || '?'}
              </div>
              <div>
                <p className="text-base font-bold text-[#0b3c5d] capitalize">
                  {data.firstName?.toLowerCase()} {data.lastName?.toLowerCase()}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {data.identifier} <span className="text-slate-300 mx-1">|</span> {data.prevision}
                </p>
              </div>
            </div>

            {(data.phone || data.email) && (
              <div className="flex flex-col gap-2 border-t border-slate-100 mt-4 pt-3 text-slate-600">
                {data.phone && (
                  <p className="text-xs flex items-center gap-2 font-mono">
                    <Phone size={13} className="text-slate-400" /> {data.phone}
                  </p>
                )}
                {data.email && (
                  <p className="text-xs flex items-center gap-2 truncate">
                    <Mail size={13} className="text-slate-400" /> {data.email}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Tarjeta Profesional */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1d7874]" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Médico Especialista</p>
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#1d7874] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
                {doctorIni || '?'}
              </div>
              <div>
                <p className="text-base font-bold text-[#0b3c5d]">{data.doctorName ?? '—'}</p>
                <p className="text-xs text-slate-500 font-medium text-[#1d7874] bg-[#1d7874]/5 px-2 py-0.5 rounded-md inline-block mt-1">
                  {data.doctorTitle || 'Médico de la Red'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Columna Derecha: Detalles de la Cita ── */}
        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200/60 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Detalles del bloque</p>
            <SummaryRow
              icon={isTelemedicina ? <Monitor size={15} /> : <Zap size={15} />}
              label="Modalidad"
              value={isTelemedicina ? 'Telemedicina' : 'Atención Presencial'}
            />
            <SummaryRow
              icon={<Stethoscope size={15} />}
              label="Especialidad"
              value={data.specialtyName ?? '—'}
            />
            <SummaryRow
              icon={<Building2 size={15} />}
              label="Sucursal"
              value={data.centerName ?? '—'}
            />
            <SummaryRow
              icon={<Calendar size={15} />}
              label="Fecha Cita"
              value={data.dateLabel ?? '—'}
            />
            <SummaryRow
              icon={<Clock size={15} />}
              label="Bloque Horario"
              value={data.slot ? `${data.slot} hrs` : '—'}
            />
          </div>
        </div>
      </div>

      {/* Alerta de Notificación */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-sm">
        <Bell size={18} className="text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm text-emerald-900 font-bold">Recordatorios activos</p>
          <p className="text-xs text-emerald-700 font-medium">
            Al confirmar, enviaremos los accesos, la orden médica y el comprobante directo a tu correo y teléfono vía SMS.
          </p>
        </div>
      </div>

      {/* Footer / Acciones */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 transition-all cursor-pointer select-none shadow-sm"
        >
          <ArrowLeft size={16} /> Volver al menú
        </button>
        
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white transition-all shadow-md select-none
            ${isLoading 
              ? 'bg-[#1d7874]/70 cursor-not-allowed' 
              : 'bg-[#1d7874] hover:bg-[#165c59] active:scale-[0.98] cursor-pointer shadow-emerald-900/10'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Procesando agenda...
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