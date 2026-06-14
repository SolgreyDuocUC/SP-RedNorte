import { useState, useEffect } from 'react';
import { LoginView } from './app/components/pages/1. Login/Login';
import { PatientRegister } from './app/components/pages/1. Login/PatientRegister';
import { PatientPortalView } from './app/components/pages/11. PatientPortal/PatientPortalView';
import { Header } from './app/components/layout/Header';
import { Sidebar } from './app/components/layout/Sidebar';
import { DashboardView } from './app/components/pages/2. Dashboards/DashboardView';
import { AppointmentsView } from './app/components/pages/3. AgendaMedica/AppointmentsView';
import { AdminView } from './app/components/pages/9. AdminView/EmploysView';
import { AdminDashboardView } from './app/components/pages/9. AdminView/AdminDashboardView';
import { AdminSpecialtiesView } from './app/components/pages/9. AdminView/AdminSpecialtiesView';
import { AdminSupportView } from './app/components/pages/9. AdminView/AdminSupportView';
import { AdminFacilitiesView } from './app/components/pages/10. AdminFacilities/AdminFacilitiesView';
import { NewAppointment } from './app/components/pages/10. AdminFacilities/NewAppointment';
import { RegisterPatient } from './app/components/pages/10. AdminFacilities/RegisterPatient';
import { WaitingListView } from './app/components/pages/5. ListaEspera/WaitingListView';
import { FacilitiesView } from './app/components/pages/6. CentrosAtencion/FacilitiesView';
import { NotificationsView } from './app/components/pages/4. Notificaciones/NotificationsView';
import { HistoryView } from './app/components/pages/7. VistaHistorial/HistoryView';
import { HomePage } from './app/home/HomePage';
import { Toaster } from './app/components/ui/sonner';
import { Reservahoraview } from './app/components/pages/8. Reservas/Reservahoraview';
import { ReagendarView } from './app/components/pages/8. Reservas/ReagendarView';
import type { AppointmentDTO } from './remotes/dtos/appointment.dto';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'administrativo' | 'enfermeria' | 'medico' | 'paciente'>('paciente');
  const [showLogin, setShowLogin] = useState(false);
  const [loginIsClinical, setLoginIsClinical] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showReserva, setShowReserva] = useState(false);
  const [showReagenda, setShowReagenda] = useState(false);
  const [reagendaData, setReagendaData] = useState<AppointmentDTO | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setActiveView(customEvent.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <PatientRegister 
          onBack={() => {
            setShowRegister(false);
            setShowLogin(true);
          }} 
          onRegisterSuccess={() => {
            setShowRegister(false);
            setShowLogin(true);
          }} 
        />
      );
    }
    if (showLogin) {
      return (
        <LoginView 
          isClinical={loginIsClinical}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={(role) => {
            console.log('User logged in with role:', role);
            setUserRole(role);
            setIsLoggedIn(true);
            setShowLogin(false);
          }} 
          onBack={() => setShowLogin(false)}
        />
      );
    }
    if (showReserva) {
      return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
           <div className="max-w-5xl mx-auto h-[85vh] bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
             <Reservahoraview onBack={() => setShowReserva(false)} />
           </div>
        </div>
      );
    }
    if (showReagenda && reagendaData) {
      return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
           <div className="max-w-5xl mx-auto h-[85vh] bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
             <ReagendarView 
               appointmentToReschedule={reagendaData} 
               onBack={() => { setShowReagenda(false); setReagendaData(null); }} 
               onSuccess={() => { setShowReagenda(false); setReagendaData(null); }} 
             />
           </div>
        </div>
      );
    }
    return <HomePage 
      onLogin={() => {
        setLoginIsClinical(false);
        setShowLogin(true);
      }} 
      onClinicalLogin={() => {
        setLoginIsClinical(true);
        setShowLogin(true);
      }}
      onReserva={() => setShowReserva(true)} 
      onReagenda={(app) => { setReagendaData(app); setShowReagenda(true); }}
    />;
  }

  // Si está logueado y es paciente, renderizar el Portal de Pacientes directamente
  if (userRole === 'paciente') {
    return (
      <>
        <Toaster position="top-right" richColors closeButton />
        <PatientPortalView onLogout={() => setIsLoggedIn(false)} />
      </>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView 
            userRole={userRole} 
            onNewBooking={() => setActiveView('new-appointment')}
            onRegisterPatient={() => setActiveView('register-patient')}
          />
        );
      case 'new-appointment':
        return (
          <NewAppointment 
            onBack={() => setActiveView('dashboard')}
            onSuccess={() => setActiveView('dashboard')}
          />
        );
      case 'register-patient':
        return (
          <RegisterPatient 
            onBack={() => setActiveView('dashboard')}
            onSuccess={() => setActiveView('dashboard')}
          />
        );
      case 'appointments':
        return <AppointmentsView userRole={userRole} />;
      case 'waiting-list':
        return <WaitingListView />;
      case 'facilities':
        return <FacilitiesView />;
      case 'notifications':
        return <NotificationsView />;
      case 'history':
        return <HistoryView />;
      case 'admin-dashboard':
        return <AdminDashboardView onNavigate={(view) => setActiveView(view)} />;
      case 'admin-users':
        return <AdminView />;
      case 'admin-facilities':
        return <AdminFacilitiesView />;
      case 'admin-specialties':
        return <AdminSpecialtiesView />;
      case 'admin-support':
        return <AdminSupportView />;
      case 'reserva':
        return <Reservahoraview onBack={() => setActiveView('dashboard')} />;
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
        onAgenda={() => setActiveView('appointments')}
        onProfile={() => setActiveView('dashboard')} // Fallback or dashboard
        onSettings={() => setActiveView('dashboard')} // Fallback or dashboard
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
          userRole={userRole}
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
