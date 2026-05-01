import { PublicHeader } from '../components/layout/PublicHeader';
import { Footer } from '../components/layout/Footer';
import { HeroSlider } from '../home/HeroSlider';
import { BookingSection } from '../home/BookingSection';
import { ServiciosSection } from '../home/ServiciosSection';
import { CentrosSection } from '../home/CentrosSection';
import { FloatingElements } from '../home/FloatingElements';

interface HomePageProps {
  onLogin: () => void;
}

export function HomePage({ onLogin }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicHeader onLogin={onLogin} />
      
      <main className="flex-1">
        <HeroSlider />
        <BookingSection />
        <ServiciosSection />
        <CentrosSection />
      </main>

      <Footer />
      <FloatingElements />
    </div>
  );
}