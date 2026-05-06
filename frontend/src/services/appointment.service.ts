import type { Appointment } from '../app/types';

class AppointmentService {
  private baseUrl = '/appointments';

  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    // Mock implementation
    return [
      {
        id: '1',
        patientId,
        patientName: 'Juan Pérez González',
        practitionerId: 'p1',
        practitionerName: 'Dr. María Silva',
        specialtyId: 's1',
        specialtyName: 'Cardiología',
        facilityId: 'f1',
        facilityName: 'Hospital Regional Iquique',
        dateTime: '2026-05-15T10:00:00',
        duration: 30,
        status: 'scheduled',
        type: 'consultation',
      },
    ];
  }

  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    // Mock implementation
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...appointment,
    };
  }

  async cancelAppointment(id: string, reason: string): Promise<void> {
    // Mock implementation
    console.log(`Appointment ${id} cancelled: ${reason}`);
  }

  async rescheduleAppointment(id: string, newDateTime: string): Promise<Appointment> {
    // Mock implementation
    return {
      id,
      dateTime: newDateTime,
    } as Appointment;
  }

  async getAvailableSlots(
    facilityId: string,
    specialtyId: string,
    date: string
  ): Promise<string[]> {
    // Mock implementation
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
