import { useState } from 'react';
import { Calendar, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import {
  MOCK_SLOTS,
  CENTER_ID,
  CENTER_NAME,
  MONTHS,
  WEEKDAYS_SHORT,
  formatDateLabel,
} from '../../../../core/constants/BookingConst';

interface Step3FechaHoraProps {
  data: Partial<BookingData>;
  onChange: (fields: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3FechaHora({ data, onChange, onNext, onBack }: Step3FechaHoraProps) {
  const today = new Date();
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const selectedDate = data.date  ?? '';
  const selectedSlot = data.slot  ?? '';
  const canProceed   = selectedDate !== '' && selectedSlot !== '';

  function changeMonth(dir: number) {
    let m = calMonth + dir;
    let y = calYear;
    if (m > 11) { m = 0;  y++; }
    if (m < 0)  { m = 11; y--; }
    setCalMonth(m);
    setCalYear(y);
  }

  function handleDateSelect(day: number) {
    const date    = new Date(calYear, calMonth, day);
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    onChange({
      date:       dateStr,
      dateLabel:  formatDateLabel(date),
      slot:       '',              // reset slot on date change
      centerId:   CENTER_ID,
      centerName: CENTER_NAME,
    });
  }

  function handleSlotSelect(time: string) {
    onChange({ slot: time });
  }

  const firstWeekday  = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth   = new Date(calYear, calMonth + 1, 0).getDate();
  const isPastMonth   = calYear < today.getFullYear() || (calYear === today.getFullYear() && calMonth < today.getMonth());

  function isDayDisabled(day: number) {
    const d = new Date(calYear, calMonth, day);
    d.setHours(0,0,0,0);
    const t = new Date(today);
    t.setHours(0,0,0,0);
    return d < t;
  }

  function isDaySelected(day: number) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return dateStr === selectedDate;
  }

  function isToday(day: number) {
    return (
      day === today.getDate() &&
      calMonth === today.getMonth() &&
      calYear  === today.getFullYear()
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <Calendar size={13} /> Paso 3 de 4
        </p>
        <h2 className="text-xl font-semibold text-[#0b3c5d]">Elige fecha y hora</h2>
        <p className="text-sm text-slate-500 mt-1">
          Selecciona un día disponible y el bloque horario que prefieras.
        </p>
      </div>

      <hr className="border-slate-100" />

      {/* Calendario */}
      <div>
        {/* Nav mes */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => changeMonth(-1)}
            disabled={isPastMonth}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={14} className="text-slate-500" />
          </button>
          <span className="text-sm font-semibold text-[#0b3c5d]">
            {MONTHS[calMonth]} {calYear}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <ArrowRight size={14} className="text-slate-500" />
          </button>
        </div>

        {/* Días de semana */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS_SHORT.map((d) => (
            <div key={d} className="text-center text-[11px] font-semibold text-slate-400 pb-2">
              {d}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const disabled  = isDayDisabled(day);
            const selected  = isDaySelected(day);
            const todayFlag = isToday(day);

            return (
              <button
                key={day}
                onClick={() => !disabled && handleDateSelect(day)}
                disabled={disabled}
                className={`
                  mx-auto w-8 h-8 rounded-lg text-xs font-medium transition-all flex items-center justify-center
                  ${selected
                    ? 'bg-[#0b3c5d] text-white'
                    : todayFlag
                      ? 'border-[1.5px] border-[#5bc0eb] text-[#0b3c5d]'
                      : disabled
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slots horarios */}
      {selectedDate && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <Clock size={12} /> Horarios disponibles
          </p>
          <div className="grid grid-cols-4 gap-2">
            {MOCK_SLOTS.map(({ time, available }) => (
              <button
                key={time}
                onClick={() => available && handleSlotSelect(time)}
                disabled={!available}
                className={`
                  py-2.5 rounded-xl text-xs font-semibold border-[1.5px] transition-all
                  ${!available
                    ? 'border-slate-100 bg-slate-50 text-slate-300 line-through cursor-not-allowed'
                    : selectedSlot === time
                      ? 'border-[#5bc0eb] bg-[#5bc0eb] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-[#5bc0eb] hover:bg-[#eaf8ff]'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Los horarios tachados ya están reservados.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 text-base font-bold text-slate-600 hover:bg-slate-100 transition-all"
        >
          <ArrowLeft size={20} /> Volver al Paso 2
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold transition-all shadow-md
            ${canProceed
              ? 'bg-[#0b3c5d] text-white hover:bg-[#0e4d76]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
        >
          Revisar Reserva <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}