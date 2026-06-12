import { patientApi } from './patient.api';
import type { CoverageDTO, PatientDTO, CreatePatientDTO } from './dtos/patient.dto';

const PATIENTS_BASE  = '/api/v1/patients';
const COVERAGES_BASE = '/api/v1/coverages';

export const patientRemote = {
  // ── Coverages ─────────────────────────────────────────────────────────────

  getCoverages(): Promise<CoverageDTO[]> {
    return patientApi.get<CoverageDTO[]>(COVERAGES_BASE).then(r => r.data);
  },

  createCoverage(dto: CoverageDTO): Promise<CoverageDTO> {
    return patientApi.post<CoverageDTO>(COVERAGES_BASE, dto).then(r => r.data);
  },

  // ── Patients ───────────────────────────────────────────────────────────────

  getAll(): Promise<PatientDTO[]> {
    return patientApi.get<{content: PatientDTO[]}>(PATIENTS_BASE).then(r => r.data.content || r.data as any);
  },

  getById(id: string): Promise<PatientDTO> {
    return patientApi.get<PatientDTO>(`${PATIENTS_BASE}/${id}`).then(r => r.data);
  },

  /** Look up a patient by identifier type (RUN | PASSPORT) and raw value */
  getByIdentifier(type: string, value: string): Promise<PatientDTO> {
    return patientApi
      .get<PatientDTO>(`${PATIENTS_BASE}/identifier/${type}/${value}`)
      .then(r => r.data);
  },

  create(dto: CreatePatientDTO): Promise<PatientDTO> {
    return patientApi.post<PatientDTO>(PATIENTS_BASE, dto).then(r => r.data);
  },

  upsert(dto: CreatePatientDTO): Promise<PatientDTO> {
    return patientApi.put<PatientDTO>(`${PATIENTS_BASE}/upsert`, dto).then(r => r.data);
  },

  update(id: string, dto: Partial<PatientDTO>): Promise<PatientDTO> {
    return patientApi.put<PatientDTO>(`${PATIENTS_BASE}/${id}`, dto).then(r => r.data);
  },

  delete(id: string): Promise<void> {
    return patientApi.delete(`${PATIENTS_BASE}/${id}`).then(() => undefined);
  },
};
