export type IdType = 'RUN' | 'PASAPORTE';
export type AppointmentType = 'PRESENCIAL' | 'TELEMEDICINA';

export interface BookingData {
  // Paso 1 - Identificación
  idType: IdType;
  identifier: string;
  prevision: string;

  // Paso 2 - Especialidad
  appointmentType: AppointmentType;
  specialtyId: string;
  specialtyName: string;

  // Paso 3 - Fecha y hora
  date: string;       // 'YYYY-MM-DD'
  dateLabel: string;  // 'Lunes 5 de mayo de 2026'
  slot: string;       // '09:30'
  doctorId: string;
  doctorName: string;
  centerId: string;
  centerName: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string; // nombre del ícono lucide
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}