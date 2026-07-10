import { practitionerApi } from './practitioner.api';

export interface PractitionerDTO {
  practitionerId: number;
  runPractitioner: string;
  activePractitioner: boolean;
  firstNamePractitioner: string;
  secondNamePractitioner?: string;
  lastNamePractitioner: string;
  genderPractitioner?: string;
  birthdayPractitioner?: string;
  qualificationsPractitioner?: unknown[];
  contactPointsPractitioner?: unknown[];
  addressesPractitioner?: unknown[];
  deceasedPractitioner?: unknown;
  centroIds?: number[];
  especialidadIds?: number[];
  centros?: unknown[];
  especialidades?: unknown[];
}

export const practitionerRemote = {
  getAll(): Promise<PractitionerDTO[]> {
    return practitionerApi.get<PractitionerDTO[]>('').then(r => r.data);
  },

  getById(id: number | string): Promise<PractitionerDTO> {
    return practitionerApi.get<PractitionerDTO>(`/${id}`).then(r => r.data);
  },

  getByRun(run: string): Promise<PractitionerDTO> {
    return practitionerApi.get<PractitionerDTO>(`/run/${run}`).then(r => r.data);
  },
};
