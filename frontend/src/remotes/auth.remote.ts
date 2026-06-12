import { authApi } from './auth.api';
import type { LoginRequestDTO, LoginResponseDTO } from './dtos/auth.dto';

const AUTH_BASE = '/api/v1/auth';

// ──────────────────────────────────────────────
// 🔒  Mock auth — cambiar a false para usar el backend real
// ──────────────────────────────────────────────
const USE_MOCK_AUTH = true;

interface MockUser {
  run: string;       // sin puntos, con guion, dv en minúscula
  password: string;
  role: string;
  name: string;
  email: string;
}

const MOCK_USERS: MockUser[] = [
  { run: '12345678-5', password: 'admin123',          role: 'admin',          name: 'Admin Demo',          email: 'admin@rednorte.cl' },
  { run: '11111111-1', password: 'administrativo123', role: 'administrativo', name: 'Administrativo Demo', email: 'administrativo@rednorte.cl' },
  { run: '22222222-2', password: 'enfermeria123',     role: 'enfermeria',     name: 'Enfermería Demo',     email: 'enfermeria@rednorte.cl' },
  { run: '33333333-3', password: 'medico123',         role: 'medico',         name: 'Médico Demo',         email: 'medico@rednorte.cl' },
  { run: '44444444-4', password: 'paciente123',       role: 'paciente',       name: 'Paciente Demo',       email: 'paciente@rednorte.cl' },
];

function mockLogin(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
  return new Promise((resolve, reject) => {
    // Simular un pequeño delay de red
    setTimeout(() => {
      const found = MOCK_USERS.find(
        (u) => u.run === dto.username && u.password === dto.password,
      );

      if (!found) {
        reject(new Error('RUN o contraseña incorrectos'));
        return;
      }

      resolve({
        token: `mock-jwt-token-${found.role}-${Date.now()}`,
        user: {
          id: `mock-${found.role}`,
          username: found.run,
          email: found.email,
          roles: [found.role],
        },
      });
    }, 400);
  });
}

// ──────────────────────────────────────────────

export const authRemote = {
  login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    if (USE_MOCK_AUTH) {
      return mockLogin(dto);
    }
    // Backend real (desactivado temporalmente)
    return authApi.post<LoginResponseDTO>(`${AUTH_BASE}/login`, dto).then(r => r.data);
  },
};
