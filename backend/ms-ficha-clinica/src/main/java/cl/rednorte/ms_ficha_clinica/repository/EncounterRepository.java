package cl.rednorte.ms_ficha_clinica.repository;

import cl.rednorte.ms_ficha_clinica.model.EncounterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EncounterRepository extends JpaRepository<EncounterEntity, String> {

    List<EncounterEntity> findByPatientId(String patientId);
}
