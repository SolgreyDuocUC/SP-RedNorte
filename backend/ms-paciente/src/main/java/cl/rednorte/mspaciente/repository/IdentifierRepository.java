package cl.rednorte.mspaciente.repository;

import cl.rednorte.mspaciente.domain.Entity.IdentifierEntity;
import cl.rednorte.mspaciente.domain.types.IdentifierType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IdentifierRepository extends JpaRepository<IdentifierEntity, String> {
    Optional<IdentifierEntity> findByTypeAndValue(IdentifierType type, String value);

    boolean existsByTypeAndValue(IdentifierType type, String value);
}
