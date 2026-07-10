package cl.rednorte.ms_centros.repository;

import cl.rednorte.ms_centros.model.EspecialidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EspecialidadRepository extends JpaRepository<EspecialidadEntity, Long> {


    /**
     * Busca una especialidad por su nombre exacto.
     * Te servirá muchísimo en la validación del Service para asegurar que no se dupliquen
     * nombres en tu catálogo estandarizado antes de guardar.
     */
    Optional<EspecialidadEntity> findByNombreEspecialidad(String nombreEspecialidad);

    /**
     * Busca especialidades que contengan una palabra clave (útil para buscadores o filtros).
     * Ignora mayúsculas y minúsculas.
     */
    List<EspecialidadEntity> findByNombreEspecialidadContainingIgnoreCase(String término);

}