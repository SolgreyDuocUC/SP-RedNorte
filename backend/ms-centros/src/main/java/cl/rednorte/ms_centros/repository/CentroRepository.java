package cl.rednorte.ms_centros.repository;

import cl.rednorte.ms_centros.model.CentroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CentroRepository extends JpaRepository<CentroEntity, Long> {

    // Mapea por el nombre
    List<CentroEntity> findByNameContainingIgnoreCase(String name);

    // Mapea
    List<CentroEntity> findByStatus(String status);

    // Filtra centros por el ID de la ComunaEntity relacionada
    List<CentroEntity> findByComuna_Id(Long idComuna);

    // Borrado lógico o cambio de estado usando JPQL apuntando a 'c.status'
    @Modifying
    @Transactional
    @Query("UPDATE CentroEntity c SET c.status = :nuevoEstado WHERE c.id = :idCentro")
    int actualizarEstado(@Param("idCentro") Long idCentro, @Param("nuevoEstado") String nuevoEstado);

}