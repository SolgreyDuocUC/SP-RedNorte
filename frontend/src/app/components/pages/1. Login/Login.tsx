import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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

interface LoginViewProps {
  onLoginSuccess: (role: 'admin' | 'administrativo' | 'enfermeria' | 'medico' | 'paciente') => void;
  onBack?: () => void;
  isClinical?: boolean;
  onRegisterClick?: () => void;
}

export function LoginView({ onLoginSuccess, onBack, isClinical = false, onRegisterClick }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    setEmailError('');
    setPassError('');

    let valid = true;

    if (!email || !email.includes('@')) {
      setEmailError('Ingresa un correo electrónico válido');
      valid = false;
    }

    if (!password || password.length < 4) {
      setPassError('Ingresa tu contraseña (mínimo 4 caracteres)');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const data = await authRemote.login(email.trim(), password);
      
      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('id', String(data.id));
      localStorage.setItem('email', data.email);
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
        setPassError('Usuario no registrado en el sistema.');
        toast.error('Usuario no encontrado', {
          description: 'Por favor, contacta a tu jefatura o al administrador del centro para solicitar acceso.',
          duration: 6000,
        });
      } else {
        setPassError('Correo electrónico o contraseña incorrectos');
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
              Ingresa tu correo y contraseña asignada para acceder.
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

          {/* Campo Correo Electrónico */}
          <div className="mb-5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              placeholder="Ej: admin@rednorte.cl"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              onKeyDown={(e) => handleKeyDown(e, () => document.getElementById('rn-pass')?.focus())}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-all
                ${emailError
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15'
                }`}
            />
            {emailError && <p className="text-xs text-red-500 mt-1.5">{emailError}</p>}
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
    </div>
  );
}