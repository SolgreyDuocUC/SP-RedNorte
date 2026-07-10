import { patientApi } from './patient.api';
import type { CoverageDTO, PatientDTO, CreatePatientDTO } from './dtos/patient.dto';
import { mockStorage } from '../mocks/mockStorage';

const PATIENTS_BASE  = '/api/v1/patients';
const COVERAGES_BASE = '/api/v1/coverages';

export const patientRemote = {
  // ── Coverages ─────────────────────────────────────────────────────────────

  getCoverages(): Promise<CoverageDTO[]> {
    return patientApi.get<any>(COVERAGES_BASE).then(r => {
      if (Array.isArray(r.data) && r.data.length > 0) return r.data;
      if (r.data && Array.isArray(r.data.content) && r.data.content.length > 0) return r.data.content;
      return mockStorage.getCoverages();
    }).catch(() => mockStorage.getCoverages());
  },

  createCoverage(dto: CoverageDTO): Promise<CoverageDTO> {
    return patientApi.post<CoverageDTO>(COVERAGES_BASE, dto).then(r => r.data).catch(() => {
      return mockStorage.createCoverage(dto);
    });
  },

  // ── Patients ───────────────────────────────────────────────────────────────

  getAll(): Promise<PatientDTO[]> {
    return patientApi.get<any>(PATIENTS_BASE).then(r => {
      if (Array.isArray(r.data) && r.data.length > 0) return r.data;
      if (r.data && Array.isArray(r.data.content) && r.data.content.length > 0) return r.data.content;
      return mockStorage.getPatients();
    }).catch(() => mockStorage.getPatients());
  },

  getById(id: string): Promise<PatientDTO> {
    return patientApi.get<PatientDTO>(`${PATIENTS_BASE}/${id}`).then(r => r.data).catch(err => {
      const found = mockStorage.getPatientById(id);
      if (found) return found;
      throw err;
    });
  },

  /** Look up a patient by identifier type (RUN | PASSPORT) and raw value */
  getByIdentifier(type: string, value: string): Promise<PatientDTO> {
    return patientApi
      .get<PatientDTO>(`${PATIENTS_BASE}/identifier/${type}/${value}`)
      .then(r => r.data).catch(err => {
        const found = mockStorage.getPatientByIdentifier(type, value);
        if (found) return found;
        throw err;
      });
  },

  create(dto: CreatePatientDTO): Promise<PatientDTO> {
    return patientApi.post<PatientDTO>(PATIENTS_BASE, dto).then(r => r.data).catch(() => {
      return mockStorage.createPatient(dto);
    });
  },

  upsert(dto: CreatePatientDTO): Promise<PatientDTO> {
    return patientApi.put<PatientDTO>(`${PATIENTS_BASE}/upsert`, dto).then(r => r.data).catch(() => {
      return mockStorage.createPatient(dto);
    });
  },

  update(id: string, dto: Partial<PatientDTO>): Promise<PatientDTO> {
    return patientApi.put<PatientDTO>(`${PATIENTS_BASE}/${id}`, dto).then(r => r.data).catch(() => {
      return mockStorage.updatePatient(id, dto);
    });
  },

  delete(id: string): Promise<void> {
    return patientApi.delete(`${PATIENTS_BASE}/${id}`).then(() => undefined).catch(() => {
      mockStorage.deletePatient(id);
    });
  },
};

