import type { Patient, PatientSearch } from '../app/types';
import { patientApi } from '../remotes/patient.api';

class PatientService {
  async getPatientById(id: string): Promise<Patient> {
    const response = await patientApi.get(`/${id}`);
    return response.data;
  }

  async searchPatients(search: PatientSearch): Promise<Patient[]> {
    if (search.field === 'rut') {
      try {
        const response = await patientApi.get(`/identifier/RUT/${search.query}`);
        return [response.data];
      } catch (e) {
        return [];
      }
    }
    const response = await patientApi.get('', { params: { [search.field]: search.query } });
    return response.data.content || (Array.isArray(response.data) ? response.data : [response.data]);
  }

  async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const response = await patientApi.post('', patient);
    return response.data;
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
    const response = await patientApi.put(`/${id}`, patient);
    return response.data;
  }
}

export const patientService = new PatientService();
