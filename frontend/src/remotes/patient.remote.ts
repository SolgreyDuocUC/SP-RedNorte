import { patientApi } from './patient.api';
import type { CoverageDTO, PatientDTO, CreatePatientDTO } from './dtos/patient.dto';

const PATIENTS_BASE  = '/api/v1/patients';
const COVERAGES_BASE = '/api/v1/coverages';

// ──────────────────────────────────────────────
// 🔌  Backend real activo (ms-paciente). Mock suspendido, no eliminado:
//     cambiar a true para volver a usar MOCK_PATIENTS/MOCK_COVERAGES en memoria.
// ──────────────────────────────────────────────
const USE_MOCK = false;

const MOCK_COVERAGES: CoverageDTO[] = [
  { id: '1', type: 'FONASA', provider: 'Tramo A' },
  { id: '2', type: 'FONASA', provider: 'Tramo B' },
  { id: '3', type: 'FONASA', provider: 'Tramo C' },
  { id: '4', type: 'FONASA', provider: 'Tramo D' },
  { id: '5', type: 'ISAPRE', provider: 'Consalud' },
  { id: '6', type: 'ISAPRE', provider: 'Banmédica' },
  { id: '7', type: 'ISAPRE', provider: 'Cruz Blanca' },
  { id: '8', type: 'ISAPRE', provider: 'Colmena' },
  { id: '9', type: 'ISAPRE', provider: 'Vida Tres' },
];

// Pacientes demo pre-cargados para lookup por RUN
const MOCK_PATIENTS: PatientDTO[] = [
  {
    id: 'mock-p1',
    identifierType: 'RUN',
    identifierValue: '268231846',
    firstName: 'Solgrey',
    lastName: 'Medina',
    phone: '+56912345678',
    email: 'solgrey@demo.cl',
    active: true,
    coverage: { type: 'FONASA', provider: 'Tramo B' },
  },
  {
    id: 'mock-p2',
    identifierType: 'RUN',
    identifierValue: '123456785',
    firstName: 'Admin',
    lastName: 'Demo',
    phone: '+56987654321',
    email: 'admin@rednorte.cl',
    active: true,
    coverage: { type: 'FONASA', provider: 'Tramo A' },
  },
  {
    id: 'mock-p3',
    identifierType: 'RUN',
    identifierValue: '444444444',
    firstName: 'Paciente',
    lastName: 'Demo',
    phone: '+56911112222',
    email: 'paciente@rednorte.cl',
    active: true,
    coverage: { type: 'ISAPRE', provider: 'Consalud' },
  },
];

function delay<T>(data: T, ms = 200): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

// ──────────────────────────────────────────────

export const patientRemote = {
  // ── Coverages ─────────────────────────────────────────────────────────────

  getCoverages(): Promise<CoverageDTO[]> {
    if (USE_MOCK) return delay([...MOCK_COVERAGES]);
    return patientApi.get<CoverageDTO[]>(COVERAGES_BASE).then(r => r.data);
  },

  createCoverage(dto: CoverageDTO): Promise<CoverageDTO> {
    if (USE_MOCK) return delay({ ...dto, id: `mock-cov-${Date.now()}` });
    return patientApi.post<CoverageDTO>(COVERAGES_BASE, dto).then(r => r.data);
  },

  // ── Patients ───────────────────────────────────────────────────────────────

  getAll(): Promise<PatientDTO[]> {
    if (USE_MOCK) return delay([...MOCK_PATIENTS]);
    return patientApi.get<PatientDTO[]>(PATIENTS_BASE).then(r => r.data);
  },

  getById(id: string): Promise<PatientDTO> {
    if (USE_MOCK) {
      const found = MOCK_PATIENTS.find(p => p.id === id);
      if (found) return delay({ ...found });
      return Promise.reject(new Error('Paciente no encontrado'));
    }
    return patientApi.get<PatientDTO>(`${PATIENTS_BASE}/${id}`).then(r => r.data);
  },

  /** Look up a patient by identifier type (RUN | PASSPORT) and raw value */
  getByIdentifier(type: string, value: string): Promise<PatientDTO> {
    if (USE_MOCK) {
      // Normalizar: quitar puntos, guiones y pasar a uppercase para comparar
      const cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
      const found = MOCK_PATIENTS.find(
        p => p.identifierType === type && p.identifierValue === cleanValue,
      );
      if (found) return delay({ ...found });
      return Promise.reject(new Error('Paciente no encontrado'));
    }
    return patientApi
      .get<PatientDTO>(`${PATIENTS_BASE}/identifier/${type}/${value}`)
      .then(r => r.data);
  },

  create(dto: CreatePatientDTO): Promise<PatientDTO> {
    if (USE_MOCK) {
      const created: PatientDTO = { ...dto, id: `mock-p-${Date.now()}` };
      MOCK_PATIENTS.push(created);
      return delay(created);
    }
    return patientApi.post<PatientDTO>(PATIENTS_BASE, dto).then(r => r.data);
  },

  upsert(dto: CreatePatientDTO): Promise<PatientDTO> {
    if (USE_MOCK) {
      const existing = MOCK_PATIENTS.find(
        p => p.identifierType === dto.identifierType && p.identifierValue === dto.identifierValue,
      );
      if (existing) {
        Object.assign(existing, dto);
        return delay({ ...existing });
      }
      const created: PatientDTO = { ...dto, id: `mock-p-${Date.now()}` };
      MOCK_PATIENTS.push(created);
      return delay(created);
    }
    return patientApi.put<PatientDTO>(`${PATIENTS_BASE}/upsert`, dto).then(r => r.data);
  },

  update(id: string, dto: Partial<PatientDTO>): Promise<PatientDTO> {
    if (USE_MOCK) {
      const existing = MOCK_PATIENTS.find(p => p.id === id);
      if (existing) {
        Object.assign(existing, dto);
        return delay({ ...existing });
      }
      return Promise.reject(new Error('Paciente no encontrado'));
    }
    return patientApi.put<PatientDTO>(`${PATIENTS_BASE}/${id}`, dto).then(r => r.data);
  },

  delete(id: string): Promise<void> {
    if (USE_MOCK) {
      const idx = MOCK_PATIENTS.findIndex(p => p.id === id);
      if (idx >= 0) MOCK_PATIENTS.splice(idx, 1);
      return delay(undefined);
    }
    return patientApi.delete(`${PATIENTS_BASE}/${id}`).then(() => undefined);
  },
};
