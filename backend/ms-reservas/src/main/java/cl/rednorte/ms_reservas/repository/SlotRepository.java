package cl.rednorte.ms_reservas.repository;

import cl.rednorte.ms_reservas.model.SlotEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<SlotEntity, String> {


    List<SlotEntity> findBySpecialtyAndStatus(String specialty, String status);

    List<SlotEntity> findByPractitionerId(String practitionerId);

    List<SlotEntity> findByStatus(String status);

    /**
     * Bloquea la fila del slot (SELECT ... FOR UPDATE) para serializar
     * reservas concurrentes sobre el mismo bloque de agenda y evitar
     * double-booking por condición de carrera check-then-act.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select s from SlotEntity s where s.id = :id")
    Optional<SlotEntity> findByIdForUpdate(@Param("id") String id);
}
