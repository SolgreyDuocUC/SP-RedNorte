import { api } from './api';
import type { AppointmentDTO, CreateAppointmentDTO } from './dtos/appointment.dto';

const BASE = '/api/v1/appointments';

// ──────────────────────────────────────────────
// 🔌  Backend real activo (ms-reservas). Mock suspendido, no eliminado:
//     cambiar a true para volver a usar MOCK_APPOINTMENTS en memoria.
// ──────────────────────────────────────────────
const USE_MOCK = false;

// Almacén en memoria para citas mock
const MOCK_APPOINTMENTS: AppointmentDTO[] = [];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

// ──────────────────────────────────────────────

export const appointmentsRemote = {
  getAll(): Promise<AppointmentDTO[]> {
    if (USE_MOCK) return delay([...MOCK_APPOINTMENTS]);
    return api.get<AppointmentDTO[]>(BASE).then(r => r.data);
  },

  getById(id: string): Promise<AppointmentDTO> {
    if (USE_MOCK) {
      const found = MOCK_APPOINTMENTS.find(a => a.id === id);
      if (found) return delay({ ...found });
      return Promise.reject(new Error('Cita no encontrada'));
    }
    return api.get<AppointmentDTO>(`${BASE}/${id}`).then(r => r.data);
  },

  getByPatient(patientId: string): Promise<AppointmentDTO[]> {
    if (USE_MOCK) {
      return delay(MOCK_APPOINTMENTS.filter(a => a.patientId === patientId));
    }
    return api.get<AppointmentDTO[]>(`${BASE}/patient/${patientId}`).then(r => r.data);
  },

  getByPractitioner(practitionerId: string): Promise<AppointmentDTO[]> {
    if (USE_MOCK) {
      return delay(MOCK_APPOINTMENTS.filter(a => a.practitionerId === practitionerId));
    }
    return api.get<AppointmentDTO[]>(`${BASE}/practitioner/${practitionerId}`).then(r => r.data);
  },

  create(dto: CreateAppointmentDTO): Promise<AppointmentDTO> {
    if (USE_MOCK) {
      const created: AppointmentDTO = {
        ...dto,
        id: `RN-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      MOCK_APPOINTMENTS.push(created);
      return delay(created);
    }
    return api.post<AppointmentDTO>(BASE, dto).then(r => r.data);
  },

  update(id: string, dto: Partial<AppointmentDTO>): Promise<AppointmentDTO> {
    if (USE_MOCK) {
      const existing = MOCK_APPOINTMENTS.find(a => a.id === id);
      if (existing) {
        Object.assign(existing, dto);
        return delay({ ...existing });
      }
      return Promise.reject(new Error('Cita no encontrada'));
    }
    return api.put<AppointmentDTO>(`${BASE}/${id}`, dto).then(r => r.data);
  },

  cancel(id: string): Promise<void> {
    if (USE_MOCK) {
      const existing = MOCK_APPOINTMENTS.find(a => a.id === id);
      if (existing) existing.status = 'cancelled';
      return delay(undefined);
    }
    return api.delete(`${BASE}/${id}`).then(() => undefined);
  },
};
