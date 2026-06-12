import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { run: '12345678-5', password: 'admin123', role: 'admin' as const },
  { run: '11111111-1', password: 'administrativo123', role: 'administrativo' as const },
  { run: '22222222-2', password: 'enfermeria123', role: 'enfermeria' as const },
  { run: '33333333-3', password: 'medico123', role: 'medico' as const },
  { run: '44444444-4', password: 'paciente123', role: 'paciente' as const },
];

// Formatea RUN mientras el usuario escribe: "123456789" → "12.345.678-9"
function formatRUN(raw: string): string {
  // Solo dígitos y K
  const clean = raw.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length === 0) return '';

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  // Puntos al cuerpo (grupos de 3 desde la derecha)
  const bodyFormatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${bodyFormatted}-${dv}`;
}

// Valida RUN chileno con módulo 11
function validateRUN(formatted: string): boolean {
  const clean = formatted.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  const expected =
    remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder);

  return dv === expected;
}

interface LoginViewProps {
  onLoginSuccess: (role: 'admin' | 'administrativo' | 'enfermeria' | 'medico' | 'paciente') => void;
  onBack?: () => void;
}

export function LoginView({ onLoginSuccess, onBack }: LoginViewProps) {
  const [run, setRun] = useState('');
  const [password, setPassword] = useState('');
  const [runError, setRunError] = useState('');
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRunChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ignorar puntos y guiones que el usuario intente tipear
    const clean = e.target.value.replace(/[^0-9kK]/g, '');

    // Máximo 9 caracteres (8 dígitos + dígito verificador)
    if (clean.length > 9) return;

    const formatted = clean.length >= 2 ? formatRUN(clean) : clean;
    setRun(formatted);

    if (runError) setRunError('');
  };

  const handleLogin = () => {
    setRunError('');
    setPassError('');

    let valid = true;

    if (!run || run.replace(/[^0-9kK]/gi, '').length < 7) {
      setRunError('Ingresa un RUN válido (ej: 12.345.678-9)');
      valid = false;
    } else if (!validateRUN(run)) {
      setRunError('El RUN ingresado no es válido');
      valid = false;
    }

    if (!password || password.length < 4) {
      setPassError('Ingresa tu contraseña');
      valid = false;
    }

    if (!valid) return;

    // Simula cómo se enviaría al backend (sin puntos, con guion y dígito en minúscula)
    const cleanRun = run.replace(/\./g, '').toLowerCase();

    const account = DEMO_ACCOUNTS.find(acc => acc.run === cleanRun && acc.password === password);

    if (!account) {
      setPassError('RUN o contraseña incorrectos');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(account.role);
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
          <div className="flex flex-col gap-1 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-[#185FA5]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0096c7] shrink-0" />
              <span className="font-semibold">Cuentas Demo disponibles:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Admin: <strong>12.345.678-5</strong> / admin123</li>
              <li>Administrativo: <strong>11.111.111-1</strong> / administrativo123</li>
              <li>Enfermería: <strong>22.222.222-2</strong> / enfermeria123</li>
              <li>Médico: <strong>33.333.333-3</strong> / medico123</li>
              <li>Paciente: <strong>44.444.444-4</strong> / paciente123</li>
            </ul>
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
              placeholder="Ej: 123456789"
              maxLength={12}
              autoComplete="username"
              inputMode="numeric"
              onChange={handleRunChange}
              onKeyDown={(e) => handleKeyDown(e, () => document.getElementById('rn-pass')?.focus())}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-all font-mono tracking-wide
                ${runError
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15'
                }`}
            />
            {/* Ayuda contextual: siempre visible, reemplazada por error si hay */}
            {!runError ? (
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 text-slate-400">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 5.5v3M6 3.5v.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Solo ingresa los números — los puntos y guión se agregan solos.
              </p>
            ) : (
              <p className="text-xs text-red-500 mt-1.5">{runError}</p>
            )}
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
        </div>
      </div>
    </div>
  );
}