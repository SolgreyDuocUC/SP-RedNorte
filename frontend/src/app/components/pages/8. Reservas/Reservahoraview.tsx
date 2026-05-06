import { useState } from 'react';
import { BookingSidebar } from './Bookingsidebar';
import { Step1Identificacion } from './Step1identificacion';
import { Step2Especialidad } from './Step2especialidad';
import { Step3FechaHora } from './Step3fechahora';
import { Step4Confirmar } from './Step4confirmar';
import { BookingSuccess } from './Bookingsuccess';
import { BookingData } from '../../../types/Booking';
import { appointmentService } from '../../../../services/appointment.service';

export function Reservahoraview({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [data, setData] = useState<Partial<BookingData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (fields: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, 4));
  const handleBackStep = () => setCurrentStep((p) => Math.max(p - 1, 1));
  
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Calcular fechas
      const startDateTime = `${data.date}T${data.slot}:00`;
      const startDate = new Date(startDateTime);
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 30); // duración asumida de 30 min
      
      const newAppointment = {
        patientId: data.identifier || "unknown",
        practitionerId: data.doctorId || data.specialtyId || "unknown",
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        status: "booked" as const,
        description: `Cita para especialidad ${data.specialtyName}`,
        
        // Frontend-only/Mocks
        patientName: "Paciente (Mock)", 
        practitionerName: data.doctorName || "Médico",
        specialtyId: data.specialtyId || "",
        specialtyName: data.specialtyName || "",
        facilityId: data.centerId || "",
        facilityName: data.centerName || "",
        dateTime: startDate.toISOString(),
        duration: 30,
        type: "consultation" as const
      };

      const response = await appointmentService.createAppointment(newAppointment);
      setBookingCode(response.id || `RN-${Math.floor(1000 + Math.random() * 9000)}`);
      setCompleted(true);
    } catch (error) {
      console.error("Error creando reserva:", error);
      alert("Hubo un error al procesar tu reserva. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Identificación', sublabel: 'Tus datos' },
    { number: 2, label: 'Especialidad', sublabel: 'Motivo consulta' },
    { number: 3, label: 'Fecha y hora', sublabel: 'Cuándo y dónde' },
    { number: 4, label: 'Confirmación', sublabel: 'Revisión final' },
  ];

  return (
    <div className="flex gap-6 h-full w-full">
      <div className="hidden md:block h-full">
        <BookingSidebar steps={steps} currentStep={currentStep} completed={completed} />
      </div>
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-y-auto">
        {!completed ? (
          <>
            {currentStep === 1 && <Step1Identificacion data={data} onChange={handleChange} onNext={handleNext} onBack={onBack} />}
            {currentStep === 2 && <Step2Especialidad data={data} onChange={handleChange} onNext={handleNext} onBack={handleBackStep} />}
            {currentStep === 3 && <Step3FechaHora data={data} onChange={handleChange} onNext={handleNext} onBack={handleBackStep} />}
            {currentStep === 4 && <Step4Confirmar data={data} onConfirm={handleConfirm} onBack={handleBackStep} isLoading={isLoading} />}
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
            }} 
          />
        )}
      </div>
    </div>
  );
}