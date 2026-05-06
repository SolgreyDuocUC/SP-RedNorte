package cl.rednorte.ms_agenda_medica.repository;

import cl.rednorte.ms_agenda_medica.model.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, String> {
    List<AppointmentEntity> findByPatientId(String patientId);

    List<AppointmentEntity> findByPractitionerId(String practitionerId);
}
