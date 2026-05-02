export type Priority = 'alta' | 'media' | 'baja';
export type AppointmentStatus = 'Ingresado' | 'En espera' | 'Priorizado' | 'Agendado' | 'Atendido' | 'Cancelado';
export type NotificationType = 'alerta' | 'info' | 'confirmación';

export interface Patient {
  id: string;
  run: string;
  nombre: string;
  edad: number;
  prevision: string;
  contacto: string;
}

export interface Professional {
  id: string;
  nombre: string;
  especialidad: string;
  establecimiento: string;
}

export interface Facility {
  id: string;
  nombre: string;
  comuna: string;
  tipo: string;
}

export interface Appointment {
  id: string;
  pacienteId: string;
  medicoId: string;
  fecha: string;
  hora: string;
  especialidad: string;
  estado: AppointmentStatus;
}

export interface WaitingListEntry {
  id: string;
  pacienteId: string;
  prioridad: Priority;
  fechaIngreso: string;
  tipoAtencion: string;
}

export interface ClinicalHistoryEntry {
  id: string;
  pacienteId: string;
  fecha: string;
  diagnostico: string;
  observaciones: string;
  medicoId: string;
}

export interface Notification {
  id: string;
  tipo: NotificationType;
  mensaje: string;
  estado: 'leído' | 'no leído';
  fecha: string;
}
