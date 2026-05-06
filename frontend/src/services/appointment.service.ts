import { appointmentsRemote } from '../remotes/appointments.remote';
import type { AppointmentDTO, CreateAppointmentDTO } from '../remotes/dtos/appointment.dto';
import type { BookingData } from '../app/types/Booking';

class AppointmentService {
  // Converts wizard BookingData into the backend DTO and submits
  bookAppointment(data: Partial<BookingData>): Promise<AppointmentDTO> {
    const startDate = new Date(`${data.date}T${data.slot}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

    const dto: CreateAppointmentDTO = {
      patientId: data.identifier ?? 'unknown',
      practitionerId: data.doctorId ?? data.specialtyId ?? 'unknown',
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      status: 'booked',
      description: `Cita de ${data.specialtyName ?? 'especialidad'}`,
    };

    return appointmentsRemote.create(dto);
  }

  getAll(): Promise<AppointmentDTO[]> {
    return appointmentsRemote.getAll();
  }

  getById(id: string): Promise<AppointmentDTO> {
    return appointmentsRemote.getById(id);
  }

  getByPatient(patientId: string): Promise<AppointmentDTO[]> {
    return appointmentsRemote.getByPatient(patientId);
  }

  getByPractitioner(practitionerId: string): Promise<AppointmentDTO[]> {
    return appointmentsRemote.getByPractitioner(practitionerId);
  }

  update(id: string, dto: Partial<AppointmentDTO>): Promise<AppointmentDTO> {
    return appointmentsRemote.update(id, dto);
  }

  cancel(id: string): Promise<void> {
    return appointmentsRemote.cancel(id);
  }
}

export const appointmentService = new AppointmentService();
