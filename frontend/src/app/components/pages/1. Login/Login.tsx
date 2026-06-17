import { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { authRemote } from '../../../../remotes/auth.remote';
import { toast } from 'sonner';
import { Toaster } from '../../ui/sonner';

function mapBackendRoleToFrontend(roles: string[]): 'admin' | 'administrativo' | 'enfermeria' | 'medico' | 'paciente' {
  const lowercaseRoles = roles.map(r => r.toLowerCase());
  if (lowercaseRoles.includes('admin') || lowercaseRoles.includes('role_admin')) return 'admin';
  if (lowercaseRoles.includes('administrativo') || lowercaseRoles.includes('role_administrativo')) return 'administrativo';
  if (lowercaseRoles.includes('enfermeria') || lowercaseRoles.includes('role_enfermeria')) return 'enfermeria';
  if (lowercaseRoles.includes('medico') || lowercaseRoles.includes('role_medico')) return 'medico';
  return 'paciente';
}

const formatRun = (value: string) => {
  let cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanValue.length === 0) return '';
  if (cleanValue.length > 1) {
    const cuerpo = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpoFormateado}-${dv}`;
  }
  return cleanValue;
};

interface LoginViewProps {
  onLoginSuccess: (role: 'admin' | 'administrativo' | 'enfermeria' | 'medico' | 'paciente') => void;
  onBack?: () => void;
  isClinical?: boolean;
  onRegisterClick?: () => void;
}

export function LoginView({ onLoginSuccess, onBack, isClinical = false, onRegisterClick }: LoginViewProps) {
  const [run, setRun] = useState('');
  const [password, setPassword] = useState('');
  const [runError, setRunError] = useState('');
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async () => {
    setRunError('');
    setPassError('');
    setShowErrorModal(false);

    let valid = true;
    const runToSend = run.replace(/\./g, '').trim();

    if (!runToSend || runToSend.length < 8) {
      setRunError('Ingresa un RUN válido');
      valid = false;
    }

    if (!password || password.length < 4) {
      setPassError('Ingresa tu contraseña (mínimo 4 caracteres)');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const data = await authRemote.login(runToSend, password, isClinical);
      
      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('id', String(data.id));
      localStorage.setItem('run', runToSend);
      localStorage.setItem('roles', JSON.stringify(data.roles));

      setLoading(false);
      setSuccess(true);

      const frontendRole = mapBackendRoleToFrontend(data.roles);

      setTimeout(() => {
        onLoginSuccess(frontendRole);
      }, 1200);
    } catch (error: any) {
      setLoading(false);
      console.error('Login error:', error);
      
      if (error.response?.status === 404 || error.response?.status === 500) {
        if (!isClinical) {
          setPassError('El RUN o la contraseña son incorrectas, intenta registrarte o cambiar tu contraseña.');
        } else {
          setPassError('Usuario no registrado en el sistema.');
          setShowErrorModal(true);
        }
      } else {
        if (!isClinical) {
          setPassError('El RUN o la contraseña son incorrectas, intenta registrarte o cambiar tu contraseña.');
        } else {
          setPassError('RUN o contraseña incorrectos');
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, next?: () => void) => {
    if (e.key === 'Enter') next?.();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <Toaster position="top-center" richColors closeButton />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* PANEL IZQUIERDO – Identidad institucional */}
        <div className="relative bg-[#023e8a] md:w-[42%] flex flex-col justify-between p-10 overflow-hidden">
          <div className="absolute w-64 h-64 rounded-full border-[40px] border-white/5 -bottom-20 -right-20 pointer-events-none" />
          <div className="absolute w-40 h-40 rounded-full border-[28px] border-[#00a7b1]/20 -top-10 -left-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start">
            {onBack && (
              <button 
                onClick={onBack} 
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl mb-8 text-base font-bold shadow-sm transition-all border border-white/20 w-fit"
              >
                <ArrowLeft size={20} /> Volver a la página principal
              </button>
            )}
            <h1 className="text-white font-bold text-2xl tracking-tight leading-tight">
              Red Norte
            </h1>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">
              {isClinical ? 'Portal Clínico' : 'Portal de Pacientes'}
            </p>
          </div>

          <div className="relative z-10 mt-8 md:mt-0">
            <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
              {isClinical 
                ? 'Acceso válido para personal clínico y administrativo autorizado de Red Norte.' 
                : 'Acceso para pacientes de la Red Norte de Salud para gestionar sus horas y exámenes.'}
            </p>
          </div>
        </div>

        {/* PANEL DERECHO – Formulario */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-[#004a87] mb-1">
            {isClinical ? 'Acceso Portal Clínico' : 'Acceso Pacientes'}
          </h2>
          <p className="text-sm text-slate-500 mb-7">Ingresa tus credenciales registradas</p>

          {/* Hint de demo */}
          <div className="flex flex-col gap-1 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-[#185FA5]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0096c7] shrink-0" />
              <span className="font-semibold">Inicio de Sesión:</span>
            </div>
            <p className="text-xs">
              Ingresa tu RUN y contraseña asignada para acceder.
            </p>
          </div>

          {/* Mensaje de éxito */}
          {success && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-5 text-sm text-emerald-800">
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <polyline points="1.5,5.5 4,8 8.5,2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Autenticado correctamente. Redirigiendo al panel...
            </div>
          )}


          {/* RUN Input */}
          <div className="space-y-2 mb-5">
            <label className="text-sm font-semibold text-slate-700">RUN</label>
            <div className={`relative flex items-center border rounded-xl overflow-hidden transition-all bg-slate-50 ${runError ? 'border-red-400 ring-4 ring-red-400/10' : 'border-slate-200 focus-within:border-[#0096c7] focus-within:ring-4 focus-within:ring-[#0096c7]/10'}`}>
              <div className="pl-4 pr-3 text-slate-400">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={run}
                onChange={(e) => setRun(formatRun(e.target.value))}
                className="w-full py-3.5 pr-4 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                placeholder="Ej. 12.345.678-9"
              />
            </div>
            {runError && <p className="text-xs font-medium text-red-500 mt-1">{runError}</p>}
          </div>

          {/* Campo Contraseña */}
          <div className="mb-6">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              id="rn-pass"
              type="password"
              value={password}
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleLogin)}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-all
                ${passError
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15'
                }`}
            />
            {passError && <p className="text-xs text-red-500 mt-1.5">{passError}</p>}
          </div>

          {/* Botón de submit */}
          {!success && (
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 mt-2 bg-[#023e8a] hover:bg-[#0077b6] disabled:opacity-60 disabled:cursor-not-allowed
                text-white text-lg font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión en mi Portal'
              )}
            </button>
          )}

          <a
            href="#"
            className="block text-center mt-4 text-xs text-[#0096c7] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            ¿Olvidaste tu contraseña?
          </a>

          {!isClinical && onRegisterClick && (
            <div className="text-center mt-6 text-sm text-slate-500">
              ¿No tienes cuenta?{' '}
              <button
                onClick={(e) => { e.preventDefault(); onRegisterClick(); }}
                className="font-semibold text-[#0096c7] hover:underline cursor-pointer"
              >
                Regístrate aquí
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Emergente de Error */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform scale-100 transition-all">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Acceso Denegado</h3>
            <p className="text-slate-600 text-sm mb-6">
              El usuario ingresado no se encuentra registrado en el sistema o no tiene permisos válidos. 
              <br /><br />
              Por favor, contacta a tu <strong>jefatura</strong> o al <strong>administrador del centro</strong> para solicitar acceso.
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-[#023e8a] hover:bg-[#0077b6] text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}