package cl.rednorte.ms_ficha_clinica.repository;

import cl.rednorte.ms_ficha_clinica.model.ProcedureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedureRepository extends JpaRepository<ProcedureEntity, String> {
    List<ProcedureEntity> findByPatientId(String patientId);

    List<ProcedureEntity> findByEncounterId(String encounterId);
}
