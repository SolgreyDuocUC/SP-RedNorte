import { useState } from 'react';
import { 
  UserPlus, 
  User, 
  Fingerprint, 
  Mail, 
  Phone, 
  Calendar as CalendarIcon, 
  MapPin, 
  ChevronLeft, 
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { patientRemote } from '../../../../remotes/patient.remote';
import { CreatePatientDTO } from '../../../../remotes/dtos/patient.dto';

interface RegisterPatientProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function RegisterPatient({ onBack, onSuccess }: RegisterPatientProps) {
  // Estado del Formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    identifierValue: '', // RUT en Chile
    birthDate: '',
    gender: 'other',
    email: '',
    phone: '',
    address: ''
  });

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: CreatePatientDTO = {
        identifierType: 'RUN',
        identifierValue: formData.identifierValue.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        gender: formData.gender.toUpperCase() as any,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        active: true
      };

      // Llamada al remote que ya tienes definido con el payload mapeado
      await patientRemote.create(payload);
      
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error registrando paciente:", err);
      setError("No se pudo registrar al paciente. Verifique si el RUT ya existe o intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto shadow-xl border-none text-center p-8 mt-12 animate-in fade-in zoom-in duration-300">
        <CardContent className="space-y-6">
          <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#004a87]">¡Paciente Registrado!</h3>
            <p className="text-sm text-slate-500">
              <strong>{formData.firstName} {formData.lastName}</strong> ha sido ingresado correctamente a la base de datos.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-2">
            <button 
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  firstName: '', lastName: '', identifierValue: '', 
                  birthDate: '', gender: 'other', email: '', phone: '', address: ''
                });
              }}
              className="w-full bg-[#00a7b1] hover:bg-[#008d96] text-white py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
            >
              Registrar Otro Paciente
            </button>
            {onBack && (
              <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 font-medium py-2">
                Volver al Dashboard
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Encabezado con botón volver */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 bg-white hover:bg-slate-50 rounded-full shadow-sm transition-colors border border-slate-100"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-[#004a87]">Registrar Nuevo Paciente</h2>
          <p className="text-xs text-slate-500">Ingrese los datos básicos para la ficha clínica</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        
        {/* Bloque 1: Datos Personales */}
        <Card className="shadow-lg border-none">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-sm font-bold text-[#004a87] flex items-center gap-2">
              <User className="h-4 w-4" /> Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Nombres</label>
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ej: María Ignacia"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Apellidos</label>
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ej: Soto Pérez"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <CalendarIcon className="h-3 w-3" /> F. Nacimiento
                </label>
                <input
                  type="date"
                  required
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Género</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                >
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                  <option value="other">Otro / No binario</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bloque 2: Identificación y Contacto */}
        <div className="space-y-6">
          <Card className="shadow-lg border-none">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-sm font-bold text-[#004a87] flex items-center gap-2">
                <Fingerprint className="h-4 w-4" /> Identificación y Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">RUT / Identificador</label>
                <input
                  required
                  name="identifierValue"
                  value={formData.identifierValue}
                  onChange={handleChange}
                  placeholder="12.345.678-9"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700 font-medium"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@correo.com"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> Dirección (Opcional)
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle, Número, Comuna"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#00a7b1] hover:bg-[#008d96] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'Guardando...'
              ) : (
                <>
                  <Save className="h-4 w-4" /> Guardar Paciente
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}