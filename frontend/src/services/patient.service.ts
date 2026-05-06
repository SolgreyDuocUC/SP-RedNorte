import type { Patient, PatientSearch } from '../app/types';

class PatientService {
  private baseUrl = '/patients';

  async getPatientById(id: string): Promise<Patient> {
    // Mock implementation
    return {
      id,
      rut: '12345678-9',
      firstName: 'Juan',
      lastName: 'Pérez González',
      dateOfBirth: '1985-03-15',
      email: 'juan.perez@email.com',
      phone: '+56 9 1234 5678',
      address: 'Av. Ejemplo 123',
      commune: 'Iquique',
      region: 'Tarapacá',
    };
  }

  async searchPatients(search: PatientSearch): Promise<Patient[]> {
    // Mock implementation
    return [
      {
        id: '1',
        rut: '12345678-9',
        firstName: 'Juan',
        lastName: 'Pérez González',
        dateOfBirth: '1985-03-15',
        email: 'juan.perez@email.com',
        phone: '+56 9 1234 5678',
      },
    ];
  }

  async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    // Mock implementation
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...patient,
    };
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
    // Mock implementation
    return {
      id,
      ...patient,
    } as Patient;
  }
}

export const patientService = new PatientService();
