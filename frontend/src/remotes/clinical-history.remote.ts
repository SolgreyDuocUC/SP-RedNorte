import { clinicalHistoryApi } from './clinical-history.api';

export interface ClinicalNoteDTO {
  id: string;
  patientId: string;
  encounterId?: string;
  content: string;
  author?: string;
  createdAt: string;
}

export interface ConditionDTO {
  patientId: string;
  encounterId?: string;
  code?: string;
  clinicalStatus?: string;
  description?: string;
}

export interface EncounterDTO {
  id: string;
  patientId: string;
  locationId?: string;
  status?: string;
  periodStart?: string;
  periodEnd?: string;
  practitioner?: string;
}

export interface ClinicalHistoryDTO {
  patientId: string;
  encounters: EncounterDTO[];
  observations: unknown[];
  conditions: ConditionDTO[];
  procedures: unknown[];
  clinicalNotes: ClinicalNoteDTO[];
}

export const clinicalHistoryRemote = {
  getByPatient(patientId: string): Promise<ClinicalHistoryDTO> {
    return clinicalHistoryApi.get<ClinicalHistoryDTO>(`/history/patient/${patientId}`).then(r => r.data);
  },
};
