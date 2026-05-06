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

  const handleChange = (fields: Partial<BookingData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const handleNext     = () => setCurrentStep(p => Math.min(p + 1, 4));
  const handleBackStep = () => setCurrentStep(p => Math.max(p - 1, 1));

  const handleConfirm = async () => {
    setIsLoading(true);
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
    } catch (error) {
      console.error('Error creando reserva:', error);
      alert('Hubo un error al procesar tu reserva. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Identificación', sublabel: 'Tus datos' },
    { number: 2, label: 'Especialidad',   sublabel: 'Profesional' },
    { number: 3, label: 'Fecha y hora',   sublabel: 'Cuándo y dónde' },
    { number: 4, label: 'Confirmación',   sublabel: 'Revisión final' },
  ];

  return (
    <div className="flex gap-6 h-full w-full">
      <div className="hidden md:block h-full">
        <BookingSidebar steps={steps} currentStep={currentStep} completed={completed} />
      </div>
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-y-auto">
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
              <Step4Confirmar data={data} onConfirm={handleConfirm} onBack={handleBackStep} isLoading={isLoading} />
            )}
          </>
        ) : (
          <BookingSuccess
            data={data}
            bookingCode={bookingCode}
            onViewAppointments={onBack}
            onNewBooking={() => { setCurrentStep(1); setCompleted(false); setData({}); }}
          />
        )}
      </div>
    </div>
  );
}
