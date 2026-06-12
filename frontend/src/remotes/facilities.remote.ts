import { facilitiesApi } from './facilities.api';

export interface FacilityDTO {
  id: string;
  organization_id?: string;
  name: string;
  status: string;
}

export const facilitiesRemote = {
  create: async (facility: Partial<FacilityDTO>): Promise<string> => {
    const response = await facilitiesApi.post('/locations', facility);
    // Returns string message with ID or just the string if it's text
    // "Ubicación creada exitosamente con ID: locId"
    return response.data;
  },

  getAll: async (): Promise<FacilityDTO[]> => {
    const response = await facilitiesApi.get('/locations');
    return response.data;
  },

  getById: async (id: string): Promise<FacilityDTO> => {
    const response = await facilitiesApi.get(`/locations/${id}`);
    return response.data;
  }
};
