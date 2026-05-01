import { useState } from 'react';

// Credenciales simuladas para el MVP (rol admin)
const DEMO_CREDENTIALS = {
  run: '12.345.678-9',
  password: 'admin123',
  role: 'admin' as const,
};

interface LoginViewProps {
  onLoginSuccess: (role: 'admin' | 'administrativo' | 'enfermeria' | 'medico' | 'paciente') => void;
}

export function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [run, setRun] = useState('');
  const [password, setPassword] = useState('');
  const [runError, setRunError] = useState('');
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setRunError('');
    setPassError('');

    let valid = true;

    if (!run || run.length < 9) {
      setRunError('Formato de RUN inválido');
      valid = false;
    }

    if (!password || password.length < 4) {
      setPassError('Ingresa tu contraseña');
      valid = false;
    }

    if (!valid) return;

    if (run !== DEMO_CREDENTIALS.run || password !== DEMO_CREDENTIALS.password) {
      setPassError('RUN o contraseña incorrectos');
      return;
    }

    setLoading(true);

    // Simula llamada a API
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(DEMO_CREDENTIALS.role);
      }, 1200);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent, next?: () => void) => {
    if (e.key === 'Enter') next?.();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* PANEL IZQUIERDO – Identidad institucional */}
        <div className="relative bg-[#023e8a] md:w-[42%] flex flex-col justify-between p-10 overflow-hidden">
          {/* Círculos decorativos */}
          <div className="absolute w-64 h-64 rounded-full border-[40px] border-white/5 -bottom-20 -right-20 pointer-events-none" />
          <div className="absolute w-40 h-40 rounded-full border-[28px] border-[#00a7b1]/20 -top-10 -left-10 pointer-events-none" />

          <div className="relative z-10">
            <h1 className="text-white font-bold text-2xl tracking-tight leading-tight">
              Red Norte
            </h1>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">
              Sistema de Salud
            </p>
          </div>

          <div className="relative z-10 mt-8 md:mt-0">
            <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
                Acceso válido para personal autorizado. Si no puedes acceder, contacta al administrador del sistema en tu establecimiento.
            </p>
          </div>
        </div>

        {/* PANEL DERECHO – Formulario */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-[#004a87] mb-1">Acceso al sistema</h2>
          <p className="text-sm text-slate-500 mb-7">Ingresa tus credenciales institucionales</p>

          {/* Hint de demo */}
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-[#185FA5]">
            <span className="w-2 h-2 rounded-full bg-[#0096c7] shrink-0" />
            <span>
              Modo demo: RUN{' '}
              <strong className="font-semibold">12.345.678-9</strong> · Contraseña{' '}
              <strong className="font-semibold">admin123</strong>
            </span>
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

          {/* Campo RUN */}
          <div className="mb-5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              RUN
            </label>
            <input
              type="text"
              value={run}
              placeholder="12.345.678-9"
              maxLength={12}
              autoComplete="username"
              onChange={(e) => setRun(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => document.getElementById('rn-pass')?.focus())}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-all
                ${runError
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15'
                }`}
            />
            {runError && <p className="text-xs text-red-500 mt-1.5">{runError}</p>}
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
              className="w-full py-3 bg-[#023e8a] hover:bg-[#0077b6] disabled:opacity-60 disabled:cursor-not-allowed
                text-white text-sm font-semibold rounded-lg transition-all active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Iniciar sesión'
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
        </div>
      </div>
    </div>
  );
}