package cl.rednorte.ms_ficha_clinica.repository;

import cl.rednorte.ms_ficha_clinica.model.ProcedureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcedureRepository extends JpaRepository<ProcedureEntity, String> {

    List<ProcedureEntity> findByPatientId(String patientId);

    List<ProcedureEntity> findByEncounterId(String encounterId);
}
