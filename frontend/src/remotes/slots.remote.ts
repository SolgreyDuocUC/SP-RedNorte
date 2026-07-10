import { api } from './api';
import type { SlotDTO } from './dtos/appointment.dto';
import { mockStorage } from '../mocks/mockStorage';

export const slotsRemote = {
  create: async (slot: Partial<SlotDTO>): Promise<SlotDTO> => {
    return api.post('/api/v1/slots', slot).then(r => r.data).catch(() => {
      const slots = mockStorage.getSlots();
      const newSlot: SlotDTO = {
        id: `s-${Date.now()}`,
        practitionerId: slot.practitionerId || 'Dr. María Silva',
        start: slot.start || new Date().toISOString(),
        end: slot.end || new Date().toISOString(),
        status: slot.status || 'free'
      };
      slots.push(newSlot);
      return newSlot;
    });
  },

  getAll: async (): Promise<SlotDTO[]> => {
    return api.get('/api/v1/slots').then(r => r.data).catch(() => mockStorage.getSlots());
  },

  getAvailable: async (specialty: string): Promise<SlotDTO[]> => {
    return api.get(`/api/v1/slots/available`, { params: { specialty } }).then(r => r.data).catch(() => mockStorage.getSlots().filter(s => s.status === 'free'));
  },

  getByPractitioner: async (practitionerId: string): Promise<SlotDTO[]> => {
    return api.get(`/api/v1/slots/practitioner/${practitionerId}`).then(r => r.data).catch(() => mockStorage.getSlots().filter(s => s.practitionerId === practitionerId));
  },

  update: async (id: string, slot: Partial<SlotDTO>): Promise<SlotDTO> => {
    return api.put(`/api/v1/slots/${id}`, slot).then(r => r.data).catch(() => ({ id, ...slot } as SlotDTO));
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/slots/${id}`).catch(() => undefined);
  }
};

