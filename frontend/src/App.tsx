import { useState } from 'react';
import { Header } from './app/components/layout/Header';
import { Sidebar } from './app/components/layout/Sidebar';
import { DashboardView } from './app/components/pages/DashboardView';
import { AppointmentsView } from './app/components/pages/AppointmentsView';
import { WaitingListView } from './app/components/pages/WaitingListView';
import { FacilitiesView } from './app/components/pages/FacilitiesView';
import { NotificationsView } from './app/components/pages/NotificationsView';
import { HistoryView } from './app/components/pages/HistoryView';
import { HomePage } from './app/home/HomePage';
import { Toaster } from './app/components/ui/sonner';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return <HomePage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'waiting-list':
        return <WaitingListView />;
      case 'facilities':
        return <FacilitiesView />;
      case 'notifications':
        return <NotificationsView />;
      case 'history':
        return <HistoryView />;
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Vista en desarrollo</h3>
              <p className="text-gray-600">Esta sección estará disponible próximamente</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full bg-background">
      <Toaster position="top-right" richColors closeButton />
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-auto md:ml-64">
          <div className="container mx-auto p-6 max-w-7xl">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
