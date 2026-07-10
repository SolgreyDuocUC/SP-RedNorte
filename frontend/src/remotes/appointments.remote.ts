import { api } from './api';
import type { AppointmentDTO, CreateAppointmentDTO } from './dtos/appointment.dto';
import { mockStorage } from '../mocks/mockStorage';

const BASE = '/api/v1/appointments';

export const appointmentsRemote = {
  getAll(): Promise<AppointmentDTO[]> {
    return api.get<any>(BASE).then(r => {
      if (Array.isArray(r.data) && r.data.length > 0) return r.data;
      if (r.data && Array.isArray(r.data.content) && r.data.content.length > 0) return r.data.content;
      return mockStorage.getAppointments();
    }).catch(() => mockStorage.getAppointments());
  },

  getById(id: string): Promise<AppointmentDTO> {
    return api.get<AppointmentDTO>(`${BASE}/${id}`).then(r => r.data).catch(err => {
      const found = mockStorage.getAppointmentById(id);
      if (found) return found;
      throw err;
    });
  },

  getByPatient(patientId: string): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/patient/${patientId}`).then(r => {
      if (Array.isArray(r.data) && r.data.length > 0) return r.data;
      return mockStorage.getAppointmentsByPatient(patientId);
    }).catch(() => mockStorage.getAppointmentsByPatient(patientId));
  },

  getByPractitioner(practitionerId: string): Promise<AppointmentDTO[]> {
    return api.get<AppointmentDTO[]>(`${BASE}/practitioner/${practitionerId}`).then(r => {
      if (Array.isArray(r.data) && r.data.length > 0) return r.data;
      return mockStorage.getAppointmentsByPractitioner(practitionerId);
    }).catch(() => mockStorage.getAppointmentsByPractitioner(practitionerId));
  },

  create(dto: CreateAppointmentDTO): Promise<AppointmentDTO> {
    return api.post<AppointmentDTO>(BASE, dto).then(r => r.data).catch(() => {
      return mockStorage.createAppointment(dto);
    });
  },

  update(id: string, dto: Partial<AppointmentDTO>): Promise<AppointmentDTO> {
    return api.put<AppointmentDTO>(`${BASE}/${id}`, dto).then(r => r.data).catch(() => {
      return mockStorage.updateAppointment(id, dto);
    });
  },

  cancel(id: string): Promise<void> {
    return api.delete(`${BASE}/${id}`).then(() => undefined).catch(() => {
      mockStorage.updateAppointment(id, { status: 'cancelled' });
    });
  },
};

