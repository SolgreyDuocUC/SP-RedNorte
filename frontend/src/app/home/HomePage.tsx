import { PublicHeader } from '../components/layout/PublicHeader';
import { Footer } from '../components/layout/Footer';
import { HeroSlider } from '../home/HeroSlider';
import { BookingSection } from '../home/BookingSection';
import { ServiciosSection } from '../home/ServiciosSection';
import { CentrosSection } from '../home/CentrosSection';
import { FloatingElements } from '../home/FloatingElements';

interface HomePageProps {
  onLogin: () => void;
  onReserva?: () => void;
}

export function HomePage({ onLogin, onReserva }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicHeader onLogin={onLogin} onReserva={onReserva} />
      
      <main className="flex-1">
        <HeroSlider />
        <BookingSection onReserva={onReserva} />
        <ServiciosSection />
        <CentrosSection />
      </main>

      <Footer />
      <FloatingElements />
    </div>
  );
}