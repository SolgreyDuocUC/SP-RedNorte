package cl.rednorte.ms_paciente.repository;

import cl.rednorte.ms_paciente.model.CoverageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoverageRepository extends JpaRepository<CoverageEntity, String> {
}
