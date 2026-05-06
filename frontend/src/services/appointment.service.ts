import { appointmentsRemote } from '../remotes/appointments.remote';
import type { AppointmentDTO, CreateAppointmentDTO } from '../remotes/dtos/appointment.dto';
import type { BookingData } from '../app/types/Booking';

class AppointmentService {
  // Converts wizard BookingData into the backend DTO and submits to ms-reservas
  bookAppointment(data: Partial<BookingData>): Promise<AppointmentDTO> {
    const startDate = new Date(`${data.date}T${data.slot}:00`);
    const endDate   = new Date(startDate.getTime() + 30 * 60 * 1000);

    const patientLabel =
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`
        : (data.identifier ?? 'Desconocido');

    const dto: CreateAppointmentDTO = {
      patientId:        data.identifier?.replace(/[^0-9kK]/g, '').toUpperCase() ?? 'unknown',
      practitionerId:   data.doctorId ?? data.specialtyId ?? 'unknown',
      start:            startDate.toISOString(),
      end:              endDate.toISOString(),
      status:           'booked',
      description: [
        data.appointmentType === 'TELEMEDICINA' ? 'Telemedicina' : 'Presencial',
        `Especialidad: ${data.specialtyName ?? 'sin especificar'}`,
        `Paciente: ${patientLabel}`,
        data.doctorName ? `Médico: ${data.doctorName}` : null,
      ].filter(Boolean).join(' · '),
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
