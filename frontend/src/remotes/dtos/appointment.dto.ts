export type AppointmentStatus = 'booked' | 'cancelled' | 'fulfilled' | 'noshow';

// Matches backend cl.rednorte.ms_reservas.dto.AppointmentDTO exactly
export interface AppointmentDTO {
  id?: string;
  patientId: string;
  practitionerId: string;
  start: string;  // ISO 8601 — backend serializes/deserializes Date as ISO
  end: string;
  status: AppointmentStatus;
  description?: string;
}

export type CreateAppointmentDTO = Omit<AppointmentDTO, 'id'>;
