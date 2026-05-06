package ms_paciente.repository;

import ms_paciente.domain.Entity.CoverageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CoverageRepository extends JpaRepository<CoverageEntity, String> {
    List<CoverageEntity> findByPatientId(String patientId);
}
