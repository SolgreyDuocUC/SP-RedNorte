import { authApi } from './auth.api';

export interface AuthResponseDTO {
  id: number;
  email: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

export const authRemote = {
  login: async (email: string, password: string): Promise<AuthResponseDTO> => {
    const response = await authApi.post<AuthResponseDTO>('/login', { email, password });
    return response.data;
  }
};
