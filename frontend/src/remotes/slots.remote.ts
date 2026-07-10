import { api } from './api';
import type { SlotDTO } from './dtos/appointment.dto';

export const slotsRemote = {
  create: async (slot: Partial<SlotDTO>): Promise<SlotDTO> => {
    return api.post('/api/v1/slots', slot).then(r => r.data);
  },

  getAll: async (): Promise<SlotDTO[]> => {
    return api.get('/api/v1/slots').then(r => r.data);
  },

  getAvailable: async (specialty: string): Promise<SlotDTO[]> => {
    return api.get(`/api/v1/slots/available`, { params: { specialty } }).then(r => r.data);
  },

  getByPractitioner: async (practitionerId: string): Promise<SlotDTO[]> => {
    return api.get(`/api/v1/slots/practitioner/${practitionerId}`).then(r => r.data);
  },

  update: async (id: string, slot: Partial<SlotDTO>): Promise<SlotDTO> => {
    return api.put(`/api/v1/slots/${id}`, slot).then(r => r.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/slots/${id}`);
  }
};
