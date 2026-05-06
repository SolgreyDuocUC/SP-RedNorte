import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import { PREVISION_OPTIONS, validateRun, formatRun } from '../../../../core/constants/BookingConst';

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

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (idType === 'RUN') {
      const clean = val.replace(/[^0-9kK]/g, '');
      if (clean.length > 9) return;
      val = clean.length >= 2 ? formatRun(clean) : clean;
    }
    setIdentifier(val);
    setError('');
  };

  const handleNext = () => {
    if (idType === 'RUN' && !validateRun(identifier)) {
      setError('RUN inválido. El formato o dígito verificador es incorrecto.');
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
              <input type="radio" checked={idType === 'RUN'} onChange={() => { setIdType('RUN'); setIdentifier(''); setError(''); }} className="accent-[#0b3c5d]" />
              RUN
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <input type="radio" checked={idType === 'PASAPORTE'} onChange={() => { setIdType('PASAPORTE'); setIdentifier(''); setError(''); }} className="accent-[#0b3c5d]" />
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
             onChange={handleIdentifierChange}
             className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all font-mono tracking-wide
               ${error ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb]'}`}
             placeholder={idType === 'RUN' ? 'Ej: 123456789' : 'Ej: A1234567'}
             maxLength={idType === 'RUN' ? 12 : 20}
             inputMode={idType === 'RUN' ? 'numeric' : 'text'}
           />
           {idType === 'RUN' && !error ? (
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 text-slate-400">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 5.5v3M6 3.5v.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Solo ingresa números — puntos y guión se agregan solos.
              </p>
           ) : (
             error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
           )}
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