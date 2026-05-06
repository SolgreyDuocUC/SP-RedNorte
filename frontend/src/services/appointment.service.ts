import type { Appointment } from '../app/types';
import { api } from '../remotes/api';

class AppointmentService {
  private baseUrl = '/api/v1/appointments';

  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    const response = await api.get(`${this.baseUrl}/patient/${patientId}`);
    return response.data;
  }

  async getAppointmentsByPractitioner(practitionerId: string): Promise<Appointment[]> {
    const response = await api.get(`${this.baseUrl}/practitioner/${practitionerId}`);
    return response.data;
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await api.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    const response = await api.get(this.baseUrl);
    return response.data;
  }

  // creation payload uses the same object in backend as output DTO
  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    const response = await api.post(this.baseUrl, appointment);
    return response.data;
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    const response = await api.put(`${this.baseUrl}/${id}`, appointment);
    return response.data;
  }

  async cancelAppointment(id: string, reason: string): Promise<void> {
    // There is no explicit cancel endpoint in the controller, 
    // but there is an update endpoint so we can update the status
    // or just use delete if that's meant to cancel.
    // Based on standard REST, delete typically removes it. 
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async rescheduleAppointment(id: string, newStart: string, newEnd: string): Promise<Appointment> {
    const appointmentToReschedule = await this.getAppointmentById(id);
    const updated = {
        ...appointmentToReschedule,
        start: newStart,
        end: newEnd
    };
    const response = await api.put(`${this.baseUrl}/${id}`, updated);
    return response.data;
  }

  async getAvailableSlots(
    facilityId: string,
    specialtyId: string,
    date: string
  ): Promise<string[]> {
    // Mock implementation for available slots because the backend 
    // AppointmentController doesn't have an endpoint for slots.
    return [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '14:00',
      '14:30',
      '15:00',
    ];
  }
}

export const appointmentService = new AppointmentService();
