import { 
  Patient, 
  Professional, 
  Facility, 
  Appointment, 
  WaitingListEntry, 
  ClinicalHistoryEntry, 
  Notification 
} from '../types/clinical';

export const mockPatients: Patient[] = [
  { id: 'p1', run: '15.432.111-0', nombre: 'Andrés Villalobos', edad: 45, prevision: 'FONASA A', contacto: '+56 9 8765 4321' },
  { id: 'p2', run: '18.990.222-k', nombre: 'Beatriz Soto', edad: 28, prevision: 'ISAPRE Colmena', contacto: '+56 9 1234 5678' },
  { id: 'p3', run: '12.777.333-4', nombre: 'Carlos Meneses', rut: '12.777.333-4', edad: 62, prevision: 'FONASA D', contacto: '+56 9 5555 4444' } as any, // Adhering to prompt field names but some components might expect 'rut'
  { id: 'p4', run: '20.111.222-3', nombre: 'Daniela Palma', edad: 24, prevision: 'FONASA B', contacto: '+56 9 9999 8888' },
  { id: 'p5', run: '10.555.666-7', nombre: 'Eduardo Frei', edad: 78, prevision: 'Dipreca', contacto: '+56 9 7777 6666' },
  { id: 'p6', run: '16.888.999-5', nombre: 'Francisca Rojas', edad: 35, prevision: 'ISAPRE Banmédica', contacto: '+56 9 1111 2222' },
  { id: 'p7', run: '14.222.333-1', nombre: 'Gonzalo Jara', edad: 50, prevision: 'FONASA C', contacto: '+56 9 3333 4444' },
  { id: 'p8', run: '19.444.555-9', nombre: 'Hernán Cortés', edad: 31, prevision: 'ISAPRE Consalud', contacto: '+56 9 6666 7777' },
  { id: 'p9', run: '11.666.777-8', nombre: 'Isabel Allende', edad: 82, prevision: 'FONASA A', contacto: '+56 9 8888 9999' },
  { id: 'p10', run: '17.333.444-2', nombre: 'Jorge González', edad: 40, prevision: 'FONASA B', contacto: '+56 9 2222 3333' },
  { id: 'p11', run: '21.555.666-4', nombre: 'Karen Doggenweiler', edad: 22, prevision: 'ISAPRE Cruz Blanca', contacto: '+56 9 4444 5555' },
  { id: 'p12', run: '13.111.000-6', nombre: 'Luis Jara', edad: 58, prevision: 'FONASA D', contacto: '+56 9 7777 8888' },
  { id: 'p13', run: '22.777.888-0', nombre: 'María José Quintanilla', edad: 19, prevision: 'FONASA B', contacto: '+56 9 0000 1111' },
  { id: 'p14', run: '15.999.000-1', nombre: 'Nicolás Massú', edad: 44, prevision: 'ISAPRE Vida Tres', contacto: '+56 9 1212 3434' },
  { id: 'p15', run: '18.222.444-5', nombre: 'Olivia Newton-John', edad: 29, prevision: 'Particular', contacto: '+56 9 5656 7878' },
];

export const mockProfessionals: Professional[] = [
  { id: 'dr1', nombre: 'Dr. Roberto Farías', especialidad: 'Medicina General', establecimiento: 'CESFAM Iquique Centro' },
  { id: 'dr2', nombre: 'Dra. Marcela Paz', especialidad: 'Pediatría', establecimiento: 'Hospital Regional Ernesto Torres Galdames' },
  { id: 'dr3', nombre: 'Dr. Claudio Bravo', especialidad: 'Traumatología', establecimiento: 'Clínica RedNorte Iquique' },
  { id: 'dr4', nombre: 'Dra. Cecilia Bolocco', especialidad: 'Dermatología', establecimiento: 'SAR La Tortuga' },
  { id: 'dr5', nombre: 'Dr. Alexis Sánchez', especialidad: 'Kinesiología', establecimiento: 'CESFAM Iquique Centro' },
  { id: 'dr6', nombre: 'Dra. Mon Laferte', especialidad: 'Ginecología', establecimiento: 'Clínica RedNorte Iquique' },
  { id: 'dr7', nombre: 'Dr. Pedro Pascal', especialidad: 'Neurología', establecimiento: 'Hospital Regional Ernesto Torres Galdames' },
  { id: 'dr8', nombre: 'Dra. Daniela Vega', especialidad: 'Psiquiatría', establecimiento: 'COSAM Iquique' },
  { id: 'dr9', nombre: 'Dr. Arturo Vidal', especialidad: 'Cardiología', establecimiento: 'Clínica RedNorte Iquique' },
  { id: 'dr10', nombre: 'Dra. Javiera Mena', especialidad: 'Oftalmología', establecimiento: 'SAR La Tortuga' },
];

export const mockFacilities: Facility[] = [
  { id: 'f1', nombre: 'Clínica RedNorte Iquique', comuna: 'Iquique', tipo: 'Clínica Privada' },
  { id: 'f2', nombre: 'Hospital Regional Ernesto Torres Galdames', comuna: 'Iquique', tipo: 'Hospital Público' },
  { id: 'f3', nombre: 'CESFAM Iquique Centro', comuna: 'Iquique', tipo: 'Atención Primaria' },
  { id: 'f4', nombre: 'SAR La Tortuga', comuna: 'Alto Hospicio', tipo: 'Urgencia' },
  { id: 'f5', nombre: 'COSAM Iquique', comuna: 'Iquique', tipo: 'Salud Mental' },
];

export const mockAppointments: Appointment[] = [
  { id: 'a1', pacienteId: 'p1', medicoId: 'dr1', fecha: '2026-05-02', hora: '08:30', especialidad: 'Medicina General', estado: 'Atendido' },
  { id: 'a2', pacienteId: 'p2', medicoId: 'dr3', fecha: '2026-05-02', hora: '09:00', especialidad: 'Traumatología', estado: 'En espera' },
  { id: 'a3', pacienteId: 'p3', medicoId: 'dr9', fecha: '2026-05-02', hora: '10:15', especialidad: 'Cardiología', estado: 'Priorizado' },
  { id: 'a4', pacienteId: 'p4', medicoId: 'dr2', fecha: '2026-05-02', hora: '11:00', especialidad: 'Pediatría', estado: 'Agendado' },
  { id: 'a5', pacienteId: 'p5', medicoId: 'dr7', fecha: '2026-05-02', hora: '12:30', especialidad: 'Neurología', estado: 'Cancelado' },
  { id: 'a6', pacienteId: 'p6', medicoId: 'dr4', fecha: '2026-05-03', hora: '09:00', especialidad: 'Dermatología', estado: 'Agendado' },
  { id: 'a7', pacienteId: 'p7', medicoId: 'dr1', fecha: '2026-05-03', hora: '10:00', especialidad: 'Medicina General', estado: 'Agendado' },
  { id: 'a8', pacienteId: 'p8', medicoId: 'dr6', fecha: '2026-05-03', hora: '11:30', especialidad: 'Ginecología', estado: 'Agendado' },
  { id: 'a9', pacienteId: 'p9', medicoId: 'dr8', fecha: '2026-05-04', hora: '15:00', especialidad: 'Psiquiatría', estado: 'Agendado' },
  { id: 'a10', pacienteId: 'p10', medicoId: 'dr10', fecha: '2026-05-04', hora: '16:30', especialidad: 'Oftalmología', estado: 'Agendado' },
];

export const mockWaitingList: WaitingListEntry[] = [
  { id: 'w1', pacienteId: 'p11', prioridad: 'alta', fechaIngreso: '2026-04-28', tipoAtencion: 'Cirugía General' },
  { id: 'w2', pacienteId: 'p12', prioridad: 'media', fechaIngreso: '2026-04-30', tipoAtencion: 'Consulta Especialidad' },
  { id: 'w3', pacienteId: 'p13', prioridad: 'baja', fechaIngreso: '2026-05-01', tipoAtencion: 'Exámenes Imagenología' },
  { id: 'w4', pacienteId: 'p4', prioridad: 'alta', fechaIngreso: '2026-05-02', tipoAtencion: 'Urgencia Dental' },
  { id: 'w5', pacienteId: 'p5', prioridad: 'media', fechaIngreso: '2026-05-02', tipoAtencion: 'Kinesiología' },
];

export const mockClinicalHistory: ClinicalHistoryEntry[] = [
  { id: 'h1', pacienteId: 'p1', fecha: '2026-04-15', diagnostico: 'Resfriado Común', observaciones: 'Se indica reposo y paracetamol.', medicoId: 'dr1' },
  { id: 'h2', pacienteId: 'p1', fecha: '2026-05-02', diagnostico: 'Control General', observaciones: 'Paciente evoluciona favorablemente.', medicoId: 'dr1' },
  { id: 'h3', pacienteId: 'p2', fecha: '2026-05-02', diagnostico: 'Esguince de Tobillo', observaciones: 'Inmovilización y derivación a kinesiología.', medicoId: 'dr3' },
  { id: 'h4', pacienteId: 'p3', fecha: '2026-04-20', diagnostico: 'Hipertensión Arterial', observaciones: 'Se ajusta dosis de Enalapril.', medicoId: 'dr9' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', tipo: 'alerta', mensaje: 'Paciente p3 requiere atención prioritaria por síntoma cardíaco.', estado: 'no leído', fecha: '2026-05-02 10:00' },
  { id: 'n2', tipo: 'info', mensaje: 'Nueva cita agendada para Dr. Roberto Farías.', estado: 'leído', fecha: '2026-05-02 08:00' },
  { id: 'n3', tipo: 'confirmación', mensaje: 'Cambio de turno realizado correctamente.', estado: 'leído', fecha: '2026-05-02 07:30' },
];
