package cl.rednorte.ms_agenda_medica.service;

import cl.rednorte.ms_agenda_medica.dto.AppointmentDTO;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {

    AppointmentDTO create(AppointmentDTO dto);

    Optional<AppointmentDTO> findById(String id);

    List<AppointmentDTO> findAll();

    List<AppointmentDTO> findByPatientId(String patientId);

    List<AppointmentDTO> findByPractitionerId(String practitionerId);

    AppointmentDTO update(String id, AppointmentDTO dto);

    void delete(String id);
}
