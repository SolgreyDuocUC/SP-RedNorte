package cl.rednorte.ms_ficha_clinica.repository;

import cl.rednorte.ms_ficha_clinica.model.ConditionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ConditionRepository extends JpaRepository<ConditionEntity, String> {
    List<ConditionEntity> findByPatientId(String patientId);

    List<ConditionEntity> findByEncounterId(String encounterId);

    List<ConditionEntity> findByPatientIdAndRecordedDateAfter(String patientId, Date date);
}
