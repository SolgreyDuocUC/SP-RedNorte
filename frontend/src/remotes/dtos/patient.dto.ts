// Matches backend cl.rednorte.ms_paciente.dto.CoverageDTO
export interface CoverageDTO {
  id?: string;
  type: 'FONASA' | 'ISAPRE' | string;
  provider?: string;
  code?: string;
  name?: string;
  description?: string;
  [key: string]: any;
}

// Matches backend cl.rednorte.ms_paciente.dto.PatientDTO
export interface PatientDTO {
  names?: any;
  identifiers?: any;
  id?: string;
  identifierType: 'RUN' | 'PASSPORT' | string;
  identifierValue: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN';
  phone?: string;
  email?: string;
  address?: string;
  active?: boolean;
  coverage?: CoverageDTO;
  prevision?: string;
  [key: string]: any;
}

export type CreatePatientDTO = Omit<PatientDTO, 'id'> & {
  birthDate?: string;
  prevision?: string;
  [key: string]: any;
};


/** Returns a human-readable label for a coverage, e.g. "Fonasa", "Isapre - Consalud" */
export function coverageLabel(dto: CoverageDTO): string {
  const base =
    dto.type === 'FONASA' ? 'Fonasa' :
    dto.type === 'ISAPRE' ? 'Isapre' :
    dto.type;
  return dto.provider ? `${base} - ${dto.provider}` : base;
}
