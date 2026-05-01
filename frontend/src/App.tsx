import { useState } from 'react';
import { LoginView } from './app/components/pages/1. Login/Login';
import { Header } from './app/components/layout/Header';
import { Sidebar } from './app/components/layout/Sidebar';
import { DashboardView } from './app/components/pages/2. Dashboards/DashboardView';
import { AppointmentsView } from './app/components/pages/3. AgendaMedica/AppointmentsView';
import { WaitingListView } from './app/components/pages/5. ListaEspera/WaitingListView';
import { FacilitiesView } from './app/components/pages/6. CentrosAtencion/FacilitiesView';
import { NotificationsView } from './app/components/pages/4. Notificaciones/NotificationsView';
import { HistoryView } from './app/components/pages/7. VistaHistorial/HistoryView';
import { HomePage } from './app/home/HomePage';
import { Toaster } from './app/components/ui/sonner';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    if (showLogin) {
      return (
        <LoginView 
          onLoginSuccess={(role) => {
            console.log('User logged in with role:', role);
            setIsLoggedIn(true);
            setShowLogin(false);
          }} 
        />
      );
    }
    return <HomePage onLogin={() => setShowLogin(true)} />;
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
    <div className="h-screen w-full flex flex-col pt-16 md:pt-20 bg-background overflow-hidden relative">
      <Toaster position="top-right" richColors closeButton />
      <Header 
        onLogout={() => setIsLoggedIn(false)} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Backdrop Responsive para Sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-sm transition-all"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          activeView={activeView}
          onViewChange={(view) => {
            setActiveView(view);
            setSidebarOpen(false); // Auto-cerrar sidebar en móvil al elegir vista
          }}
          isOpen={sidebarOpen}
        />

        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden md:ml-64 relative">
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
