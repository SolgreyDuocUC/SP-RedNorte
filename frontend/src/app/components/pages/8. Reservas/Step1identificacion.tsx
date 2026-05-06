import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import { PREVISION_OPTIONS, validateRun } from '../../../../core/constants/BookingConst';

interface Step1IdentificacionProps {
  data: Partial<BookingData>;
  onChange: (fields: Partial<BookingData>) => void;
  onNext: () => void;
}

export function Step1Identificacion({ data, onChange, onNext }: Step1IdentificacionProps) {
  const [identifier, setIdentifier] = useState(data.identifier ?? '');
  const [prevision, setPrevision] = useState(data.prevision ?? '');
  const [idType, setIdType] = useState<BookingData['idType']>(data.idType ?? 'RUN');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (idType === 'RUN' && !validateRun(identifier)) {
      setError('RUN inválido. Formato esperado: 12.345.678-9');
      return;
    }
    setError('');
    onChange({ identifier, prevision, idType });
    onNext();
  };

  const isValid = identifier.length >= 8 && prevision !== '';

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <User size={13} /> Paso 1 de 4
        </p>
        <h2 className="text-xl font-semibold text-[#0b3c5d]">Identificación del Paciente</h2>
        <p className="text-sm text-slate-500 mt-1">Ingresa los datos del paciente para la reserva.</p>
      </div>

      <hr className="border-slate-100" />

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0b3c5d] mb-2 uppercase tracking-wide text-xs">Tipo de Identificación</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <input type="radio" checked={idType === 'RUN'} onChange={() => setIdType('RUN')} className="accent-[#0b3c5d]" />
              RUN
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <input type="radio" checked={idType === 'PASAPORTE'} onChange={() => setIdType('PASAPORTE')} className="accent-[#0b3c5d]" />
              Pasaporte
            </label>
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-[#0b3c5d] mb-1">
             {idType === 'RUN' ? 'RUN' : 'Pasaporte'}
           </label>
           <input
             type="text"
             value={identifier}
             onChange={(e) => {
               setIdentifier(e.target.value);
               setError('');
             }}
             className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb] outline-none transition-all"
             placeholder={idType === 'RUN' ? '12.345.678-9' : 'Ej: A1234567'}
           />
           {error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>}
        </div>

        <div>
           <label className="block text-sm font-medium text-[#0b3c5d] mb-1">Previsión</label>
           <select
             value={prevision}
             onChange={(e) => setPrevision(e.target.value)}
             className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb] outline-none transition-all bg-white"
           >
             <option value="">Seleccione previsión</option>
             {PREVISION_OPTIONS.map((opt) => (
               <option key={opt} value={opt}>{opt}</option>
             ))}
           </select>
        </div>
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-slate-100">
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all
            ${isValid
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