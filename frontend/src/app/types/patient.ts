export interface Patient {
  id: string;
  rut: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address?: string;
  commune?: string;
  region?: string;
}

export interface PatientSearch {
  query: string;
  field: 'rut' | 'name' | 'email' | 'phone';
}
