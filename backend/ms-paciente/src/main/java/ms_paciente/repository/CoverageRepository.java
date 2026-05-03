package ms_paciente.repository;

import ms_paciente.domain.Entity.CoverageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface CoverageRepository extends JpaRepository<CoverageEntity, UUID> {
    List<CoverageEntity> findByPatientId(UUID patientId);
}
