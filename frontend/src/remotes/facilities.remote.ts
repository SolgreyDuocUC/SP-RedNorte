import { facilitiesApi } from './facilities.api';
import { mockStorage } from '../mocks/mockStorage';

export interface FacilityDTO {
  id: string;
  organization_id?: string;
  name: string;
  status?: string;
  specialties?: string[];
  type?: string;
  address?: string;
  commune?: string;
  region?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}



export const facilitiesRemote = {
  create: async (facility: Partial<FacilityDTO>): Promise<string> => {
    try {
      const response = await facilitiesApi.post('/locations', facility);
      return response.data;
    } catch (error) {
      const created = mockStorage.createFacility(facility);
      return `Ubicación creada exitosamente con ID: ${created.id}`;
    }
  },

  getAll: async (): Promise<FacilityDTO[]> => {
    try {
      const response = await facilitiesApi.get('/locations');
      if (Array.isArray(response.data) && response.data.length > 0) return response.data;
      if (response.data && Array.isArray(response.data.content) && response.data.content.length > 0) return response.data.content;
      return mockStorage.getFacilities();
    } catch (error) {
      console.warn("Backend no disponible o modo estático (GitHub Pages), usando mockStorage para facilities.");
      return mockStorage.getFacilities();
    }
  },

  getById: async (id: string): Promise<FacilityDTO> => {
    try {
      const response = await facilitiesApi.get(`/locations/${id}`);
      return response.data;
    } catch (error) {
      const found = mockStorage.getFacilities().find(f => f.id === id);
      if (found) return found;
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await facilitiesApi.delete(`/locations/${id}`);
    } catch (error) {
      mockStorage.deleteFacility(id);
    }
  }
};

