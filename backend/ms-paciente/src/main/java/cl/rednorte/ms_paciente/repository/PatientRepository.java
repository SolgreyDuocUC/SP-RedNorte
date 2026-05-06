package cl.rednorte.ms_paciente.repository;

import cl.rednorte.ms_paciente.model.PatientEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<PatientEntity, String> {

    Optional<PatientEntity> findByIdentifierTypeAndIdentifierValue(String type, String value);

    Optional<PatientEntity> findByIdentifierValue(String value);

    Page<PatientEntity> findAllByActiveTrue(Pageable pageable);
}
