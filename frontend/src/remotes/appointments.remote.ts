import { api } from './api';
import type { AppointmentDTO, CreateAppointmentDTO } from './dtos/appointment.dto';

const BASE = '/api/v1/appointments';

export const appointmentsRemote = {
  getAll(): Promise<AppointmentDTO[]> {
    return api.get<any>(BASE).then(r => {
      if (Array.isArray(r.data)) return r.data;
      if (r.data && Array.isArray(r.data.content)) return r.data.content;
      return [];
    });
  },

  getById(id: string): Promise<AppointmentDTO> {
    return api.get<AppointmentDTO>(`${BASE}/${id}`).then(r => r.data);
  },

  getByPatient(patientId: string): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/patient/${patientId}`).then(r => {
      if (Array.isArray(r.data)) return r.data;
      return [];
    });
  },

  getByPractitioner(practitionerId: string): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/practitioner/${practitionerId}`).then(r => {
      if (Array.isArray(r.data)) return r.data;
      return [];
    });
  },

  getWaitlist(): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/waitlist`).then(r => {
      if (Array.isArray(r.data)) return r.data;
      return [];
    });
  },

  create(dto: CreateAppointmentDTO): Promise<AppointmentDTO> {
    return api.post<AppointmentDTO>(BASE, dto).then(r => r.data);
  },

  update(id: string, dto: Partial<AppointmentDTO>): Promise<AppointmentDTO> {
    return api.put<AppointmentDTO>(`${BASE}/${id}`, dto).then(r => r.data);
  },

  cancel(id: string): Promise<void> {
    return api.delete(`${BASE}/${id}`).then(() => undefined);
  },
};


