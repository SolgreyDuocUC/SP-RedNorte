export interface Appointment {
  id: string;
  patientId: string;
  practitionerId: string;
  start: string; // from backend Date
  end: string;   // from backend Date
  status: AppointmentStatus; 
  description?: string; // from backend

  // Frontend-only / Mock fields
  patientName: string;
  practitionerName: string;
  specialtyId: string;
  specialtyName: string;
  facilityId: string;
  facilityName: string;
  dateTime: string;
  duration: number;
  type: AppointmentType;
  cancelReason?: string;
}

// Matched with backend ms-reservas (booked, cancelled, fulfilled, noshow)
export type AppointmentStatus =
  | 'booked'
  | 'cancelled'
  | 'fulfilled'
  | 'noshow';

// Mock values for frontend
export type AppointmentType =
  | 'consultation'
  | 'procedure'
  | 'surgery'
  | 'followup'
  | 'emergency';
