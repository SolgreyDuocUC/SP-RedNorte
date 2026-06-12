import { useState } from 'react';
import { BookingSidebar } from './Bookingsidebar';
import { Step1Identificacion } from './Step1identificacion';
import { Step2Especialidad } from './Step2especialidad';
import { Step3FechaHora } from './Step3fechahora';
import { Step4Confirmar } from './Step4confirmar';
import { BookingSuccess } from './Bookingsuccess';
import { BookingData } from '../../../types/Booking';
import { appointmentService } from '../../../../services/appointment.service';
import { patientRemote } from '../../../../remotes/patient.remote';
import type { CoverageDTO } from '../../../../remotes/dtos/patient.dto';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { toast } from 'sonner';

/** Maps a prevision display label back to a CoverageDTO for ms-paciente */
function toCoverageDTO(prevision: string): CoverageDTO | undefined {
  if (!prevision || prevision === 'Particular') return undefined;
  const parts    = prevision.split(' - ');
  const baseText = parts[0].trim().toLowerCase();
  const type     = baseText.startsWith('fonasa') ? 'FONASA'
                 : baseText.startsWith('isapre') ? 'ISAPRE'
                 : parts[0].trim();
  return { type, provider: parts[1]?.trim() };
}

export function Reservahoraview({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed,   setCompleted]   = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [data,        setData]        = useState<Partial<BookingData>>({});
  const [isLoading,   setIsLoading]   = useState(false);
  const [uiError,     setUiError]     = useState<string | null>(null);

  const handleChange = (fields: Partial<BookingData>) => {
    setData(prev => ({ ...prev, ...fields }));
    if (uiError) setUiError(null); // Limpiar errores al interactuar
  };

  const handleNext     = () => {
    setUiError(null);
    setCurrentStep(p => Math.min(p + 1, 4));
  };
  const handleBackStep = () => {
    setUiError(null);
    setCurrentStep(p => Math.max(p - 1, 1));
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setUiError(null);
    try {
      // 1. Create the appointment in ms-reservas
      const created = await appointmentService.bookAppointment(data);

      // 2. Persist patient demographic data in ms-paciente (best effort — non-blocking)
      try {
        await patientRemote.upsert({
          identifierType: data.idType === 'PASAPORTE' ? 'PASSPORT' : 'RUN',
          identifierValue: data.identifier?.replace(/[^0-9kK]/g, '').toUpperCase() ?? '',
          firstName: data.firstName,
          lastName:  data.lastName,
          phone:     data.phone,
          email:     data.email,
          coverage:  toCoverageDTO(data.prevision ?? ''),
        });
      } catch {
        // Appointment already confirmed — patient upsert failure is non-critical
      }

      setBookingCode(created.id ?? `RN-${Math.floor(1000 + Math.random() * 9000)}`);
      setCompleted(true);
      toast.success('¡Reserva confirmada con éxito!', {
        description: `Código de reserva: ${created.id ?? 'Confirmada'}`,
      });
    } catch (error) {
      console.error('Error creando reserva:', error);
      const errMsg = 'No pudimos procesar tu reserva en este momento. Por favor, verifica tu conexión o intenta nuevamente.';
      setUiError(errMsg);
      toast.error('Error al procesar la reserva', {
        description: errMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPrompt = () => {
    toast('¿Estás seguro de confirmar la reserva?', {
      description: `Se agendará una hora de ${data.specialtyName} para ${data.firstName} ${data.lastName}.`,
      duration: 10000,
      action: {
        label: 'Confirmar',
        onClick: () => handleConfirm(),
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {},
      },
    });
  };

  const steps = [
    { number: 1, label: 'Identificación', sublabel: 'Tus datos' },
    { number: 2, label: 'Especialidad',   sublabel: 'Profesional' },
    { number: 3, label: 'Fecha y hora',   sublabel: 'Cuándo y dónde' },
    { number: 4, label: 'Confirmación',   sublabel: 'Revisión final' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full w-full max-w-6xl mx-auto items-stretch">
      
      {/* Sidebar para pantallas medianas/grandes */}
      <div className="hidden md:block shrink-0">
        <BookingSidebar steps={steps} currentStep={currentStep} completed={completed} />
      </div>

      {/* Indicador de pasos exclusivo para Móviles (Superior) */}
      {!completed && (
        <div className="block md:hidden bg-white border border-slate-200 rounded-xl p-3 shadow-sm mx-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Progreso de Reserva</span>
            <span className="text-xs font-bold text-[#0b3c5d] bg-slate-100 px-2 py-0.5 rounded-full">
              Paso {currentStep} de 4
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#0b3c5d] h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-[#0b3c5d] mt-2 text-center">
            {steps[currentStep - 1].label} — <span className="text-slate-400 font-normal">{steps[currentStep - 1].sublabel}</span>
          </p>
        </div>
      )}

      {/* Contenedor Principal de Vistas */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 md:p-8 overflow-y-auto min-h-[500px] flex flex-col justify-between transition-all">
        <div>
          {/* Alerta de error estilizada si falla el backend */}
          {uiError && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 animate-fadeIn">
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div className="flex-1">
                <p className="text-sm text-red-900 font-bold">Error de procesamiento</p>
                <p className="text-xs text-red-700 mt-0.5 font-medium">{uiError}</p>
              </div>
              <button 
                onClick={() => setUiError(null)} 
                className="text-xs text-red-400 hover:text-red-600 font-bold px-1.5 py-0.5 rounded"
              >
                Ignorar
              </button>
            </div>
          )}

          {!completed ? (
            <>
              {currentStep === 1 && (
                <Step1Identificacion data={data} onChange={handleChange} onNext={handleNext} onBack={onBack} />
              )}
              {currentStep === 2 && (
                <Step2Especialidad data={data} onChange={handleChange} onNext={handleNext} onBack={handleBackStep} />
              )}
              {currentStep === 3 && (
                <Step3FechaHora data={data} onChange={handleChange} onNext={handleNext} onBack={handleBackStep} />
              )}
              {currentStep === 4 && (
                <Step4Confirmar data={data} onConfirm={handleConfirmPrompt} onBack={handleBackStep} isLoading={isLoading} />
              )}
            </>
          ) : (
            <BookingSuccess
              data={data}
              bookingCode={bookingCode}
              onViewAppointments={onBack}
              onNewBooking={() => { 
                setCurrentStep(1); 
                setCompleted(false); 
                setData({}); 
                setUiError(null);
              }}
            />
          )}
        </div>

        {/* Pantalla de carga superpuesta sutil por si el botón hijo no congela todo */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] pointer-events-none flex items-center justify-center rounded-2xl" />
        )}
      </div>
    </div>
  );
}