import { authApi } from './auth.api';
import axios from 'axios';

export interface AuthResponseDTO {
  id: string | number;
  email?: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

export const authRemote = {
  login: async (run: string, password: string, isClinical: boolean = true): Promise<AuthResponseDTO> => {
    if (isClinical) {
      const response = await authApi.post<AuthResponseDTO>('/login', { run, password });
      return response.data;
    } else {
      const response = await axios.post<AuthResponseDTO>('/proxy/pacientes/api/v1/patients/auth/login', { 
        identifierValue: run, 
        password: password 
      });
      return response.data;
    }
  },
  registerPatient: async (payload: any) => {
    const response = await axios.post('/proxy/pacientes/api/v1/patients/auth/register', payload);
    return response.data;
  }
};
