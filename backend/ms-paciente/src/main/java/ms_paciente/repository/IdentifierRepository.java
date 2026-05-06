package ms_paciente.repository;

import ms_paciente.domain.Entity.IdentifierEntity;
import ms_paciente.domain.types.IdentifierType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IdentifierRepository extends JpaRepository<IdentifierEntity, String> {
    Optional<IdentifierEntity> findByTypeAndValue(IdentifierType type, String value);

    boolean existsByTypeAndValue(IdentifierType type, String value);
}
