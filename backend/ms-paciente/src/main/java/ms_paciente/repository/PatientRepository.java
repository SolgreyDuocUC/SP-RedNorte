package ms_paciente.repository;

import ms_paciente.domain.Entity.PatientEntity;
import ms_paciente.domain.types.IdentifierType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, String> {

    List<PatientEntity> findByLastNameContainingIgnoreCase(String lastName);

    @Query("SELECT DISTINCT p FROM PatientEntity p " +
           "WHERE (:name IS NULL OR LOWER(p.firstName) LIKE LOWER(CONCAT('%', :name, '%')) " +
           "       OR LOWER(p.lastName) LIKE LOWER(CONCAT('%', :name, '%'))) " +
           "AND (:run IS NULL OR EXISTS (" +
           "       SELECT i FROM IdentifierEntity i WHERE i.patient = p AND i.type = :runType AND LOWER(i.value) = LOWER(:run))) " +
           "AND (:provider IS NULL OR EXISTS (" +
           "       SELECT c FROM CoverageEntity c WHERE c.patient = p AND LOWER(c.provider) = LOWER(:provider)))")
    List<PatientEntity> searchAdvanced(@Param("name") String name,
                                       @Param("run") String run,
                                       @Param("provider") String provider,
                                       @Param("runType") IdentifierType runType);
}
