import { authApi } from './auth.api';
import axios from 'axios';
import { mockStorage } from '../mocks/mockStorage';

export interface AuthResponseDTO {
  id: string | number;
  email?: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

// El fallback a mockStorage sólo debe activarse cuando el backend es
// inalcanzable (sin `response`, ej. servidor caído / sin red). Si el backend
// respondió (401 credenciales inválidas, 404 no registrado, 409 duplicado,
// etc.) ese error debe propagarse: usarlo como "modo demo" para enmascarar
// errores reales permitiría iniciar sesión con cualquier contraseña.
const isBackendUnreachable = (err: unknown): boolean =>
  axios.isAxiosError(err) && !err.response;

export const authRemote = {
  login: async (run: string, password: string, isClinical: boolean = true): Promise<AuthResponseDTO> => {
    try {
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
    } catch (err) {
      if (isBackendUnreachable(err)) {
        return mockStorage.login(run, password, isClinical);
      }
      throw err;
    }
  },
  registerPatient: async (payload: any) => {
    try {
      const response = await axios.post('/proxy/pacientes/api/v1/patients/auth/register', payload);
      return response.data;
    } catch (err) {
      if (isBackendUnreachable(err)) {
        return mockStorage.registerPatient(payload);
      }
      throw err;
    }
  }
};

