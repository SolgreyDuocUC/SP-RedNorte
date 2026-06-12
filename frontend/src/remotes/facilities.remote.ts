import { facilitiesApi } from './facilities.api';

export interface FacilityDTO {
  id: string;
  organization_id?: string;
  name: string;
  status: string;
  specialties?: string[];
  type?: string;
  address?: string;
  commune?: string;
  region?: string;
  phone?: string;
  email?: string;
}


export const facilitiesRemote = {
  create: async (facility: Partial<FacilityDTO>): Promise<string> => {
    const response = await facilitiesApi.post('/locations', facility);
    // Returns string message with ID or just the string if it's text
    // "Ubicación creada exitosamente con ID: locId"
    return response.data;
  },

  getAll: async (): Promise<FacilityDTO[]> => {
    try {
      const response = await facilitiesApi.get('/locations');
      if (Array.isArray(response.data)) return response.data;
      if (response.data && Array.isArray(response.data.content)) return response.data.content;
      return [];
    } catch (error) {
      console.error("Error fetching facilities:", error);
      return [];
    }
  },

  getById: async (id: string): Promise<FacilityDTO> => {
    const response = await facilitiesApi.get(`/locations/${id}`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await facilitiesApi.delete(`/locations/${id}`);
  }
};
