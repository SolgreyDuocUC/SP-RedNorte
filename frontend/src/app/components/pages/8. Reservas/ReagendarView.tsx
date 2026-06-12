import { useState } from 'react';
import { ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
import { BookingData } from '../../../types/Booking';
import { Step2Especialidad } from './Step2especialidad';
import { Step3FechaHora } from './Step3fechahora';
import { Step4Confirmar } from './Step4confirmar';
import type { AppointmentDTO } from '../../../../remotes/dtos/appointment.dto';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';

interface ReagendarViewProps {
  appointmentToReschedule: AppointmentDTO;
  onBack: () => void;
  onSuccess: () => void;
}

export function ReagendarView({ appointmentToReschedule, onBack, onSuccess }: ReagendarViewProps) {
  const [currentStep, setCurrentStep] = useState(2);
  const [data, setData] = useState<Partial<BookingData>>({
    specialtyId: appointmentToReschedule.specialty.toLowerCase(), // Especialidad fijada
    doctorId: appointmentToReschedule.practitionerId,
    // Note: We don't prefill date/time so they are forced to pick a new one
  });

  function updateData(fields: Partial<BookingData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleConfirm() {
    setIsSubmitting(true);
    try {
      // Create new appointment
      const newApp: Omit<AppointmentDTO, 'id'> = {
        patientId: appointmentToReschedule.patientId, // Maintain same patient
        practitionerId: data.doctorId!,
        specialty: data.specialtyId!,
        start: `${data.date}T${data.slot}:00.000Z`,
        end: `${data.date}T${data.slot}:30.000Z`,
        status: 'booked'
      };
      
      // Cancel old
      if (appointmentToReschedule.id) {
        await appointmentsRemote.update(appointmentToReschedule.id, { status: 'cancelled' });
      }
      
      await appointmentsRemote.create(newApp);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Error al reagendar cita');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-full font-sans animate-in slide-in-from-bottom-8 duration-500">
      {/* Sidebar Izquierdo */}
      <div className="hidden md:flex w-[280px] lg:w-[320px] bg-[#004a87] text-white flex-col relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <HeartPulse className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 pointer-events-none rotate-12" />

        <div className="p-8 relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-white/90 mb-12">
            <ShieldCheck size={28} className="text-[#5bc0eb]" />
            <span className="text-xl font-bold tracking-tight">RedNorte</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Reagendar Cita</h2>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              Selecciona un nuevo profesional o fecha para tu atención de <span className="font-bold text-white">{appointmentToReschedule.specialty}</span>.
            </p>
          </div>

          <div className="flex flex-col gap-6 relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-blue-400/30" />

            <StepIndicator step={2} currentStep={currentStep} title="Especialidad y Profesional" />
            <StepIndicator step={3} currentStep={currentStep} title="Fecha y Hora" />
            <StepIndicator step={4} currentStep={currentStep} title="Confirmación" />
          </div>
        </div>

        <div className="p-6 bg-black/10 relative z-10">
          <p className="text-xs text-blue-200 text-center">
            Tu reserva anterior se cancelará automáticamente al confirmar la nueva fecha.
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col bg-slate-50 relative overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto p-6 md:p-10 lg:p-12">
          {currentStep === 2 && (
            <Step2Especialidad
              data={data}
              onChange={updateData}
              onNext={() => setCurrentStep(3)}
              onBack={onBack}
            />
          )}

          {currentStep === 3 && (
            <Step3FechaHora
              data={data}
              onChange={updateData}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <Step4Confirmar
              data={data}
              onBack={() => setCurrentStep(3)}
              onConfirm={handleConfirm}
              isLoading={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step, currentStep, title }: { step: number; currentStep: number; title: string }) {
  const isCompleted = currentStep > step;
  const isCurrent = currentStep === step;
  const isPending = currentStep < step;

  return (
    <div className="flex items-center gap-4 relative z-10">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all
          ${isCompleted ? 'bg-[#5bc0eb] text-white' : ''}
          ${isCurrent ? 'bg-white text-[#004a87] ring-4 ring-white/20' : ''}
          ${isPending ? 'bg-[#003561] text-blue-300' : ''}
        `}
      >
        {isCompleted ? <CheckCircle2 size={16} /> : step}
      </div>
      <span
        className={`text-sm font-semibold transition-all
          ${isCompleted ? 'text-white' : ''}
          ${isCurrent ? 'text-white translate-x-1' : ''}
          ${isPending ? 'text-blue-200/50' : ''}
        `}
      >
        {title}
      </span>
    </div>
  );
}
