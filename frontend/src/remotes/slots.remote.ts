import { api } from './api';
import type { SlotDTO } from './dtos/appointment.dto';

export const slotsRemote = {
  create: async (slot: Partial<SlotDTO>): Promise<SlotDTO> => {
    const response = await api.post('/api/v1/slots', slot);
    return response.data;
  },

  getAll: async (): Promise<SlotDTO[]> => {
    const response = await api.get('/api/v1/slots');
    return response.data;
  },

  getAvailable: async (specialty: string): Promise<SlotDTO[]> => {
    const response = await api.get(`/api/v1/slots/available`, { params: { specialty } });
    return response.data;
  },

  getByPractitioner: async (practitionerId: string): Promise<SlotDTO[]> => {
    const response = await api.get(`/api/v1/slots/practitioner/${practitionerId}`);
    return response.data;
  },

  update: async (id: string, slot: Partial<SlotDTO>): Promise<SlotDTO> => {
    const response = await api.put(`/api/v1/slots/${id}`, slot);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/slots/${id}`);
  }
};
