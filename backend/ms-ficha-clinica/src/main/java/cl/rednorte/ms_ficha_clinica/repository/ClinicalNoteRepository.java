package cl.rednorte.ms_ficha_clinica.repository;

import cl.rednorte.ms_ficha_clinica.model.ClinicalNoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicalNoteRepository extends JpaRepository<ClinicalNoteEntity, String> {

    List<ClinicalNoteEntity> findByPatientId(String patientId);

    List<ClinicalNoteEntity> findByEncounterId(String encounterId);
}
