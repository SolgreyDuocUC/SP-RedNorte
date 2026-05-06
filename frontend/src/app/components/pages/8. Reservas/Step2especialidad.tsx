import {
  Heart, Brain, Bone, Eye, Wind, Stethoscope,
  Baby, Activity, ArrowLeft, ArrowRight,
} from 'lucide-react';
import { BookingData, AppointmentType } from '../../../types/Booking';
import { SPECIALTIES, MOCK_DOCTORS } from '../../../../core/constants/BookingConst';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Heart, Brain, Bone, Eye, Wind, Stethoscope, Baby, Activity,
};

interface Step2EspecialidadProps {
  data: Partial<BookingData>;
  onChange: (fields: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Especialidad({ data, onChange, onNext, onBack }: Step2EspecialidadProps) {
  const appointmentType = data.appointmentType ?? 'PRESENCIAL';
  const specialtyId     = data.specialtyId     ?? '';

  function handleTypeChange(type: AppointmentType) {
    onChange({ appointmentType: type });
  }

  function handleSpecialtySelect(id: string, name: string) {
    const doctor = MOCK_DOCTORS.find((d) => d.specialty === id);
    onChange({
      specialtyId:   id,
      specialtyName: name,
      doctorId:      doctor?.id   ?? '',
      doctorName:    doctor?.name ?? '',
    });
  }

  const canProceed = specialtyId !== '';

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <Stethoscope size={13} /> Paso 2 de 4
        </p>
        <h2 className="text-xl font-semibold text-[#0b3c5d]">Selecciona la especialidad</h2>
        <p className="text-sm text-slate-500 mt-1">¿Qué tipo de consulta necesitas?</p>
      </div>

      <hr className="border-slate-100" />

      {/* Tipo de consulta */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Modalidad</p>
        <div className="flex gap-3">
          {(['PRESENCIAL', 'TELEMEDICINA'] as AppointmentType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl border-[1.5px] transition-all text-sm font-medium
                ${appointmentType === type
                  ? 'border-[#5bc0eb] bg-[#eaf8ff] text-[#0b3c5d]'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                }`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${appointmentType === type ? 'border-[#5bc0eb]' : 'border-slate-300'}`}
              >
                {appointmentType === type && (
                  <span className="w-2 h-2 rounded-full bg-[#5bc0eb] block" />
                )}
              </span>
              {type === 'PRESENCIAL' ? 'Consulta presencial' : 'Telemedicina'}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla de especialidades */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Especialidad</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SPECIALTIES.map((spec) => {
            const Icon = ICON_MAP[spec.icon] ?? Activity;
            const isSelected = specialtyId === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => handleSpecialtySelect(spec.id, spec.name)}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border-[1.5px] transition-all text-center
                  ${isSelected
                    ? 'border-[#5bc0eb] bg-[#eaf8ff] shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${isSelected ? 'bg-[#0b3c5d]' : 'bg-white border border-slate-200'}`}
                >
                  <Icon
                    size={20}
                    className={isSelected ? 'text-white' : 'text-[#0b3c5d]'}
                  />
                </div>
                <span
                  className={`text-xs font-semibold leading-tight transition-colors
                    ${isSelected ? 'text-[#0b3c5d]' : 'text-slate-600'}`}
                >
                  {spec.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctor asignado (preview) */}
      {data.doctorName && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e6f7f4] border border-[#9fe1cb]">
          <div className="w-8 h-8 rounded-full bg-[#1d7874] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {data.doctorName.split(' ').slice(-2).map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="text-xs text-[#085041] font-semibold">Médico asignado</p>
            <p className="text-sm text-[#0f6e56] font-medium">{data.doctorName}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={15} /> Volver
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all
            ${canProceed
              ? 'bg-[#0b3c5d] text-white hover:bg-[#0e4d76] shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          Siguiente <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}