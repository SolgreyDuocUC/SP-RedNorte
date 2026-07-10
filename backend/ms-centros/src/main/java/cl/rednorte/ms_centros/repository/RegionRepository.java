package cl.rednorte.ms_centros.repository;

import cl.rednorte.ms_centros.model.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegionRepository extends JpaRepository<RegionEntity, Long> {


    List<RegionEntity> findByNombreContainingIgnoreCase(String nombre);

    Optional<RegionEntity> findByNombreIgnoreCase(String nombre);

    boolean existsByNombreIgnoreCase(String nombre);

}
