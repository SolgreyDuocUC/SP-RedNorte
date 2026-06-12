import { useState, useEffect } from 'react';
import { User, ArrowRight, ArrowLeft, Phone, Mail } from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import { PREVISION_OPTIONS, validateRun, formatRun } from '../../../../core/constants/BookingConst';
import { patientRemote } from '../../../../remotes/patient.remote';
import { coverageLabel } from '../../../../remotes/dtos/patient.dto';

interface Step1IdentificacionProps {
  data: Partial<BookingData>;
  onChange: (fields: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step1Identificacion({ data, onChange, onNext, onBack }: Step1IdentificacionProps) {
  const [idType, setIdType] = useState<BookingData['idType']>(data.idType ?? 'RUN');
  const [identifier, setIdentifier] = useState(data.identifier ?? '');
  const [prevision, setPrevision] = useState(data.prevision ?? '');
  const [firstName, setFirstName] = useState(data.firstName ?? '');
  const [lastName, setLastName] = useState(data.lastName ?? '');
  const [phone, setPhone] = useState(data.phone ?? '');
  const [email, setEmail] = useState(data.email ?? '');
  
  // Errores individuales para feedback visual inmediato
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Coberturas
  const [coverageOptions, setCoverageOptions] = useState<string[]>(PREVISION_OPTIONS);
  const [loadingCoverages, setLoadingCoverages] = useState(true);

  useEffect(() => {
    patientRemote.getCoverages()
      .then(dtos => {
        if (dtos.length > 0) {
          const labels = [...new Set(dtos.map(coverageLabel))].sort();
          if (!labels.includes('Particular')) labels.push('Particular');
          setCoverageOptions(labels);
        }
      })
      .catch(() => { /* keep hardcoded fallback */ })
      .finally(() => setLoadingCoverages(false));
  }, []);

  // ── FORMATEADORES EN TIEMPO REAL ──

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (idType === 'RUN') {
      const clean = val.replace(/[^0-9kK]/g, '');
      if (clean.length > 9) return;
      val = clean.length >= 2 ? formatRun(clean) : clean;
      
      // Limpiar error si vuelve a escribir
      if (errors.identifier) setErrors(prev => ({ ...prev, identifier: '' }));
    } else {
      val = val.toUpperCase();
    }
    setIdentifier(val);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extraer sólo los dígitos numéricos omitiendo el prefijo base si ya existe
    let input = e.target.value;
    
    // Si el usuario borra casi todo, reiniciamos al prefijo base
    if (input.length < 6) {
      setPhone('+56 9 ');
      return;
    }

    // Tomamos sólo los números que van después de '+569' o '+56 9'
    const digitsOnly = input.slice(5).replace(/\D/g, '');
    if (digitsOnly.length > 8) return; // Limite de 8 números móviles chilenos

    // Formatear visualmente: +56 9 XXXX XXXX
    let formatted = '+56 9 ';
    if (digitsOnly.length > 0) {
      formatted += digitsOnly.substring(0, 4);
    }
    if (digitsOnly.length > 4) {
      formatted += ' ' + digitsOnly.substring(4, 8);
    }

    setPhone(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setEmail(val);
    
    if (val === '') {
      setErrors(prev => ({ ...prev, email: '' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setErrors(prev => ({ ...prev, email: 'Formato de correo electrónico inválido.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleTextChange = (val: string, setter: (v: string) => void, fieldName: string) => {
    // No permitir números ni caracteres especiales comunes en nombres
    const cleanText = val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, '');
    setter(cleanText);
    if (errors[fieldName]) setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  // ── VALIDACIÓN AL SALIR DEL INPUT (BLUR) ──

  const handleIdentifierBlur = async () => {
    if (idType !== 'RUN') return;
    
    if (!validateRun(identifier)) {
      setErrors(prev => ({ ...prev, identifier: 'RUN inválido. Verifique el dígito verificador.' }));
      return;
    }

    const rawRun = identifier.replace(/[^0-9kK]/g, '').toUpperCase();
    try {
      const patient = await patientRemote.getByIdentifier('RUN', rawRun);
      if (patient.coverage) {
        const label = coverageLabel(patient.coverage);
        const match = coverageOptions.find(o => o === label) ?? label;
        setPrevision(match);
      }
      if (patient.firstName) setFirstName(patient.firstName);
      if (patient.lastName)  setLastName(patient.lastName);
      
      if (patient.phone) {
        // Formatear el teléfono de la API si viene crudo
        const cleanPhone = patient.phone.replace(/\D/g, '').slice(-8);
        if (cleanPhone.length === 8) {
          setPhone(`+56 9 ${cleanPhone.substring(0, 4)} ${cleanPhone.substring(4, 8)}`);
        } else {
          setPhone(patient.phone);
        }
      }
      if (patient.email) setEmail(patient.email);
    } catch {
      // Paciente nuevo o error en microservicio
    }
  };

  const handleNext = () => {
    if (idType === 'RUN' && !validateRun(identifier)) {
      setErrors(prev => ({ ...prev, identifier: 'RUN inválido. El formato o dígito verificador es incorrecto.' }));
      return;
    }
    
    onChange({ identifier, prevision, idType, firstName, lastName, phone, email });
    onNext();
  };

  // Validación de negocio para habilitar el botón de continuar
  const isPhoneValid = phone.replace(/\D/g, '').length === 11; // 569 + 8 dígitos = 11
  const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$2/.test(email + '@'); // Correo opcional o válido constructivo
  
  const isValid =
    (idType === 'RUN' ? validateRun(identifier) : identifier.trim().length >= 4) &&
    prevision !== '' &&
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    isPhoneValid &&
    Object.values(errors).every(err => !err);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5bc0eb] uppercase mb-1 flex items-center gap-1">
          <User size={13} /> Paso 1 de 4
        </p>
        <h2 className="text-xl font-semibold text-[#0b3c5d]">Identificación del Paciente</h2>
        <p className="text-sm text-slate-500 mt-1">Ingresa los datos del paciente para la reserva.</p>
      </div>

      <hr className="border-slate-100" />

      {/* ── Identificación ── */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0b3c5d] mb-2 uppercase tracking-wide">
            Tipo de Identificación
          </label>
          <div className="flex gap-4">
            {([ 'RUN', 'PASAPORTE' ] as const).map(type => (
              <label key={type} className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer select-none">
                <input
                  type="radio"
                  checked={idType === type}
                  onChange={() => { 
                    setIdType(type); 
                    setIdentifier(type === 'RUN' ? '' : ''); 
                    setErrors({}); 
                  }}
                  className="accent-[#0b3c5d] w-4 h-4"
                />
                {type === 'RUN' ? 'RUN (Chileno)' : 'Pasaporte'}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b3c5d] mb-1">
            Documento de Identidad <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={identifier}
            onChange={handleIdentifierChange}
            onBlur={handleIdentifierBlur}
            className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all font-mono tracking-wide
              ${errors.identifier
                ? 'border-red-400 ring-2 ring-red-100 bg-red-50/30'
                : 'border-slate-200 focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb]'
              }`}
            placeholder={idType === 'RUN' ? 'Ej: 12.345.678-9' : 'Ej: A1234567'}
            maxLength={idType === 'RUN' ? 12 : 20}
            inputMode={idType === 'RUN' ? 'numeric' : 'text'}
          />
          {errors.identifier ? (
            <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">⚠️ {errors.identifier}</p>
          ) : idType === 'RUN' ? (
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              Solo ingresa números — los puntos y el guión aparecerán automáticos.
            </p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b3c5d] mb-1">
            Previsión / Cobertura <span className="text-red-400">*</span>
          </label>
          <select
            value={prevision}
            onChange={(e) => setPrevision(e.target.value)}
            disabled={loadingCoverages}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb] outline-none transition-all bg-white disabled:opacity-60 cursor-pointer"
          >
            <option value="">
              {loadingCoverages ? 'Cargando coberturas…' : 'Seleccione previsión'}
            </option>
            {coverageOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* ── Datos de contacto ── */}
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Datos personales del paciente
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0b3c5d] mb-1">
              Nombre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleTextChange(e.target.value, setFirstName, 'firstName')}
              placeholder="Ej: Juan Pablo"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b3c5d] mb-1">
              Apellido <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => handleTextChange(e.target.value, setLastName, 'lastName')}
              placeholder="Ej: Pérez Cotapos"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb] outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0b3c5d] mb-1 flex items-center gap-1.5">
              <Phone size={13} className="text-slate-400" /> Celular de Contacto <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={phone || '+56 9 '}
              onChange={handlePhoneChange}
              placeholder="+56 9 1234 5678"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b3c5d] mb-1 flex items-center gap-1.5">
              <Mail size={13} className="text-slate-400" /> Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="correo@ejemplo.cl"
              className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all
                ${errors.email
                  ? 'border-red-400 ring-2 ring-red-100 bg-red-50/30'
                  : 'border-slate-200 focus:ring-2 focus:ring-[#5bc0eb]/20 focus:border-[#5bc0eb]'
                }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Los campos con <span className="text-red-400 font-bold">*</span> son requeridos de forma obligatoria.
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 text-base font-bold text-slate-600 hover:bg-slate-100 transition-all"
        >
          <ArrowLeft size={20} /> Cancelar y volver
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold transition-all shadow-md
            ${isValid
              ? 'bg-[#0b3c5d] text-white hover:bg-[#0e4d76] cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
        >
          Continuar al Paso 2 <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}