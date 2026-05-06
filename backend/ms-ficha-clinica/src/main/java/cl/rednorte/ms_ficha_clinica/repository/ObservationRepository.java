package cl.rednorte.ms_ficha_clinica.repository;

import cl.rednorte.ms_ficha_clinica.model.ObservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ObservationRepository extends JpaRepository<ObservationEntity, String> {

    List<ObservationEntity> findByPatientId(String patientId);

    List<ObservationEntity> findByEncounterId(String encounterId);

    List<ObservationEntity> findByPatientIdAndEffectiveDateAfter(String patientId, Date date);
}
