package cl.rednorte.ms_centros.repository;

import cl.rednorte.ms_centros.model.ComunaEntity;
import cl.rednorte.ms_centros.model.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComunaRepository extends JpaRepository<ComunaEntity, Long> {

    // Con "region_Id" le dices a Spring: "Entra al atributo 'region' y busca por su 'id'"
    List<ComunaEntity> findByRegion_Id(Long idRegion);

    // SQL: SELECT * FROM comunas WHERE nombre LIKE '%texto%'
    List<ComunaEntity> findByNombreContainingIgnoreCase(String nombre);

    Optional<ComunaEntity> findByNombreIgnoreCaseAndRegion_Id(String nombre, Long idRegion);

    boolean existsByNombreIgnoreCaseAndRegion_Id(String nombre, Long idRegion);
}

