import { useState } from 'react';
import { BookingSidebar } from './Bookingsidebar';
import { Step1Identificacion } from './Step1identificacion';
import { Step2Especialidad } from './Step2especialidad';
import { Step3FechaHora } from './Step3fechahora';
import { Step4Confirmar } from './Step4confirmar';
import { BookingSuccess } from './Bookingsuccess';
import { BookingData } from '../../../types/Booking';

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
  
  const handleConfirm = () => {
    setIsLoading(true);
    // API Call simulation
    setTimeout(() => {
      setBookingCode(`RN-${Math.floor(1000 + Math.random() * 9000)}`);
      setCompleted(true);
      setIsLoading(false);
    }, 1000);
  };

  const steps = [
    { number: 1, label: 'Identificación', sublabel: 'Tus datos' },
    { number: 2, label: 'Especialidad', sublabel: 'Motivo consulta' },
    { number: 3, label: 'Fecha y hora', sublabel: 'Cuándo y dónde' },
    { number: 4, label: 'Confirmación', sublabel: 'Revisión final' },
  ];

  return (
    <div className="flex gap-6 h-full w-full">
      <div className="hidden md:block">
        <BookingSidebar steps={steps} currentStep={currentStep} completed={completed} />
      </div>
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-y-auto">
        {!completed ? (
          <>
            {currentStep === 1 && <Step1Identificacion data={data} onChange={handleChange} onNext={handleNext} />}
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