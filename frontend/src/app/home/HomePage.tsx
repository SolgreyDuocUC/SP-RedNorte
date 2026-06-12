import { useState } from 'react';
import { PublicHeader } from '../components/layout/PublicHeader';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../home/HeroSection';
import { InfoSection } from '../home/InfoSection';
import { BookingSection } from '../home/BookingSection';
import { ServiciosSection } from '../home/ServiciosSection';
import { CentrosSection } from '../home/CentrosSection';
import { FloatingElements } from '../home/FloatingElements';
import type { AppointmentDTO } from '../../remotes/dtos/appointment.dto';

interface HomePageProps {
  onLogin: () => void;
  onReserva?: () => void;
  onReagenda?: (app: AppointmentDTO) => void;
}

export function HomePage({ onLogin, onReserva, onReagenda }: HomePageProps) {
  const [bookingTab, setBookingTab] = useState<'consultas' | 'examenes' | 'mis-reservas'>('consultas');

  const scrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEspecialidadesClick = () => {
    setBookingTab('consultas');
    // small timeout to ensure DOM renders if tab changes, then scroll
    setTimeout(scrollToBooking, 50);
  };

  const handleConsultarClick = () => {
    setBookingTab('mis-reservas');
    setTimeout(scrollToBooking, 50);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicHeader onLogin={onLogin} onReserva={onReserva} />
      
      <main className="flex-1">
        <HeroSection 
          onEspecialidadesClick={handleEspecialidadesClick} 
          onConsultarClick={handleConsultarClick} 
        />
        <InfoSection />
        <div id="booking-section">
          <BookingSection 
            onReserva={onReserva} 
            activeTab={bookingTab} 
            setActiveTab={setBookingTab} 
            onReagenda={onReagenda}
          />
        </div>
        <ServiciosSection />
        <CentrosSection />
      </main>

      <Footer />
      <FloatingElements />
    </div>
  );
}