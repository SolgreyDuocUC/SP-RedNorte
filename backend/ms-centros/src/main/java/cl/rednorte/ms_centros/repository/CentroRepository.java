package cl.rednorte.ms_centros.repository;

import cl.rednorte.ms_centros.model.CentroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CentroRepository extends JpaRepository<CentroEntity, String> {
}
