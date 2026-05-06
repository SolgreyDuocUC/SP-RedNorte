import { api } from './api';
import type { AppointmentDTO, CreateAppointmentDTO } from './dtos/appointment.dto';

const BASE = '/api/v1/appointments';

export const appointmentsRemote = {
  getAll(): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(BASE).then(r => r.data);
  },

  getById(id: string): Promise<AppointmentDTO> {
    return api.get<AppointmentDTO>(`${BASE}/${id}`).then(r => r.data);
  },

  getByPatient(patientId: string): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/patient/${patientId}`).then(r => r.data);
  },

  getByPractitioner(practitionerId: string): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/practitioner/${practitionerId}`).then(r => r.data);
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
