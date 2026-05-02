export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  practitionerId: string;
  practitionerName: string;
  specialtyId: string;
  specialtyName: string;
  facilityId: string;
  facilityName: string;
  dateTime: string;
  duration: number;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  cancelReason?: string;
}

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export type AppointmentType =
  | 'consultation'
  | 'procedure'
  | 'surgery'
  | 'followup'
  | 'emergency';
