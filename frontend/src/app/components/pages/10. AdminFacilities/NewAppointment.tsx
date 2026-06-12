import { useState, useEffect } from 'react';
import { 
  User, 
  Search, 
  Calendar as CalendarIcon, 
  Clock, 
  Stethoscope, 
  ChevronLeft, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PatientDTO } from '../../../../remotes/dtos/patient.dto';
import { patientRemote } from '../../../../remotes/patient.remote';
import { appointmentsRemote } from '../../../../remotes/appointments.remote';
import { CreateAppointmentDTO } from '../../../../remotes/dtos/appointment.dto';
import { SPECIALTIES } from '../../../../core/constants/BookingConst';


interface NewAppointmentProps {
  onBack?: () => void;         // Para regresar al Dashboard
  onSuccess?: () => void;      // Callback para refrescar datos tras agendar
}

export function NewAppointment({ onBack, onSuccess }: NewAppointmentProps) {
  // Estados de datos
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientDTO | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados del Formulario
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState(''); // Opcional, según tu backend
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Cargar pacientes al iniciar para la búsqueda
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await patientRemote.getAll();
        setPatients(patientsData);
      } catch (err) {
        console.error("Error cargando pacientes:", err);
        setError("No se pudieron cargar los pacientes. Intente de nuevo.");
      }
    };
    fetchPatients();
  }, []);

  // Filtrado de pacientes en tiempo real
  const filteredPatients = patients.filter(p => 
    `${p.firstName || ''} ${p.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.identifierValue && p.identifierValue.includes(searchTerm))
  ).slice(0, 4); // Limitamos a 4 resultados para mantener limpia la vista

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      setError("Por favor, seleccione un paciente.");
      return;
    }

    setLoading(true);
    setError(null);

    // Combinar fecha y hora para el formato ISO que requiere el AppointmentDTO (start y end)
    const startDate = new Date(`${date}T${time}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutos por defecto
    const startDateTime = startDate.toISOString();
    const endDateTime = endDate.toISOString();

    try {
      const payload: CreateAppointmentDTO = {
        patientId: selectedPatient.id || '',
        practitionerId: doctor.trim() || 'practitioner-1',
        specialty,
        start: startDateTime,
        end: endDateTime,
        status: 'booked',
        description: `Cita agendada para la especialidad de ${specialty}`
      };

      await appointmentsRemote.create(payload);

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error al agendar cita:", err);
      setError("Hubo un error al guardar la atención. Por favor, intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Vista de éxito tras agendar
  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto shadow-xl border-none text-center p-8 mt-12 animate-fade-in bg-white">
        <CardContent className="space-y-6">
          <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#004a87]">¡Atención Agendada exitosamente!</h3>
            <p className="text-sm text-slate-500">
              La cita para <strong>{selectedPatient?.firstName} {selectedPatient?.lastName}</strong> ha sido registrada en el sistema.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-2">
            <button 
              onClick={() => {
                setIsSuccess(false);
                setSelectedPatient(null);
                setSpecialty('');
                setDoctor('');
                setDate('');
                setTime('');
              }}
              className="w-full bg-[#00a7b1] hover:bg-[#008d96] text-white py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
            >
              Agendar Otra Atención
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button 
            type="button"
            onClick={onBack}
            className="p-2 bg-white hover:bg-slate-50 rounded-full shadow-sm transition-colors border border-slate-100"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-[#004a87]">Nueva Atención</h2>
          <p className="text-xs text-slate-500">Formulario para el agendamiento y control de citas médicas</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3 items-start">
        
        {/* Sección 1: Selección de Paciente */}
        <Card className="shadow-lg border-none md:col-span-1 bg-white">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-sm font-bold text-[#004a87] flex items-center gap-2">
              <User className="h-4 w-4" /> 1. Paciente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {!selectedPatient ? (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por RUT o Nombre..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none"
                  />
                </div>
                
                <div className="space-y-1 max-h-[220px] overflow-y-auto">
                  {searchTerm && filteredPatients.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">No se encontraron resultados</p>
                  )}
                  {filteredPatients.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPatient(p)}
                      className="w-full text-left flex flex-col p-2.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                    >
                      <span className="text-xs font-bold text-slate-800">{p.firstName} {p.lastName}</span>
                      <span className="text-[10px] text-slate-500">{p.identifierValue || 'Sin RUN'}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 relative">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Paciente Seleccionado</p>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{selectedPatient.firstName} {selectedPatient.lastName}</h4>
                  <p className="text-xs text-slate-600">{selectedPatient.identifierValue || 'Sin RUN'}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => { setSelectedPatient(null); setSearchTerm(''); }}
                  className="text-[11px] text-[#00a7b1] hover:underline font-medium pt-1 block"
                >
                  Cambiar paciente
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sección 2: Detalles de la Cita */}
        <Card className="shadow-lg border-none md:col-span-2 bg-white">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-sm font-bold text-[#004a87] flex items-center gap-2">
              <Stethoscope className="h-4 w-4" /> 2. Detalles de la Cita
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Especialidad */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5 text-slate-400" /> Especialidad
                  </label>
                  <select
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                  >
                    <option value="" disabled hidden>Seleccione especialidad...</option>
                    {SPECIALTIES.map(spec => (
                      <option key={spec.id} value={spec.name}>{spec.name}</option>
                    ))}
                  </select>
                </div>

                {/* Profesional (Opcional - por si tu backend lo escala) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" /> Profesional Médico
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Dr. Juan Pérez"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Fecha */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> Fecha de Atención
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                  />
                </div>

                {/* Hora */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" /> Hora
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#00a7b1]/20 outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-4 flex justify-end gap-3 border-t">
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-5 py-2 border rounded-full text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || !selectedPatient}
                  className="bg-[#00a7b1] hover:bg-[#008d96] text-white px-6 py-2 rounded-full text-xs font-bold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Guardando...' : 'Confirmar Agenda'}
                </button>
              </div>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
