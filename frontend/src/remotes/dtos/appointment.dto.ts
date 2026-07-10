export type AppointmentStatus = 'booked' | 'cancelled' | 'fulfilled' | 'noshow' | 'waitlist' | 'scheduled';

// Matches backend cl.rednorte.ms_reservas.dto.AppointmentDTO exactly
export interface AppointmentDTO {
  id?: string;
  patientId: string;
  practitionerId: string;
  practitionerName?: string;
  facilityId?: string;
  facilityName?: string;
  specialty: string; // requerido por el backend (columna NOT NULL)
  start: string;  // ISO 8601 — backend serializes/deserializes Date as ISO
  end: string;
  status: AppointmentStatus | string;
  description?: string;
  priority?: number; // 1 = Normal, 2 = Urgente, 3 = Crítico (backend ms-reservas)
  slotId?: string;
  createdAt?: string;
  [key: string]: any;
}


export type CreateAppointmentDTO = Omit<AppointmentDTO, 'id'>;

export interface SlotDTO {
  id?: string;
  practitionerId: string;
  specialty?: string;
  start: string;
  end: string;
  status: string; // 'free', 'busy', 'reserved'
  [key: string]: any;
}

