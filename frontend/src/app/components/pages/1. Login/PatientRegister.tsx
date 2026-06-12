import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { usersRemote, UserDTO } from '../../../../remotes/users.remote';
import { toast } from 'sonner';

interface PatientRegisterProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function PatientRegister({ onBack, onRegisterSuccess }: PatientRegisterProps) {
  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!run.trim() || !nombre.trim() || !email.trim() || !password.trim()) {
      toast.error('Campos incompletos', { description: 'Por favor, llena todos los campos.' });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Contraseñas no coinciden', { description: 'Asegúrate de que ambas contraseñas sean idénticas.' });
      return;
    }

    if (password.length < 4) {
      toast.error('Contraseña muy corta', { description: 'Debe tener al menos 4 caracteres.' });
      return;
    }

    setLoading(true);

    try {
      const payload: UserDTO = {
        username: `${run.trim()}|${nombre.trim()}`,
        email: email.trim(),
        password: password,
        enabled: true,
        roles: [{ name: 'ROLE_PACIENTE' }]
      };

      await usersRemote.create(payload);
      toast.success('Cuenta creada con éxito', { description: 'Ya puedes iniciar sesión en tu portal.' });
      onRegisterSuccess();
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Error al registrarse', { description: error.response?.data?.message || 'El email o RUN ya podría estar en uso.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        <div className="p-8">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition mb-6 text-sm font-semibold"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <h2 className="text-2xl font-bold text-[#004a87] mb-1">Crea tu cuenta de Paciente</h2>
          <p className="text-sm text-slate-500 mb-8">Ingresa tus datos personales para acceder a tu portal de salud.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">RUN</label>
              <input
                required
                type="text"
                value={run}
                onChange={e => setRun(e.target.value)}
                placeholder="Ej: 12.345.678-9"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
              <input
                required
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Correo Electrónico</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contraseña</label>
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 4 caracteres"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirmar Contraseña</label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0096c7] focus:ring-2 focus:ring-[#0096c7]/15 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-[#023e8a] hover:bg-[#0077b6] disabled:opacity-60 text-white text-base font-bold rounded-xl shadow-md transition-all flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Creando cuenta...
                </span>
              ) : (
                'Registrarse y Crear Cuenta'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
