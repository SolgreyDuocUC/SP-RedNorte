export type IdType = 'RUN' | 'PASAPORTE';
export type AppointmentType = 'PRESENCIAL' | 'TELEMEDICINA';

export interface BookingData {
  // Paso 1 — Identificación
  idType: IdType;
  identifier: string;
  prevision: string;

  // Paso 1 — Contacto (persiste en ms-paciente al confirmar)
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;

  // Paso 2 — Especialidad y profesional
  appointmentType: AppointmentType;
  specialtyId: string;
  specialtyName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle?: string;

  // Paso 3 — Fecha y hora
  date: string;       // 'YYYY-MM-DD'
  dateLabel: string;  // 'Lunes 5 de mayo de 2026'
  slot: string;       // '09:30'
  centerId: string;
  centerName: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  title?: string;
  experience?: number;
  bio?: string;
  slots?: number;
}
