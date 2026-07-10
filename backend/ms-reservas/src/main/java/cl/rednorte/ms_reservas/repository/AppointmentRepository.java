package cl.rednorte.ms_reservas.repository;

import cl.rednorte.ms_reservas.model.AppointmentEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, String> {

    List<AppointmentEntity> findByPatientId(String patientId);

    List<AppointmentEntity> findByPractitionerId(String practitionerId);

    List<AppointmentEntity> findByStatusOrderByPriorityDescCreatedAtAsc(String status);

    List<AppointmentEntity> findByStatusAndSpecialtyOrderByPriorityDescCreatedAtAsc(String status, String specialty);

    List<AppointmentEntity> findBySlot_IdAndStatus(String slotId, String status);

    /**
     * Igual que findByStatusAndSpecialtyOrderByPriorityDescCreatedAtAsc pero
     * bloqueando las filas candidatas (SELECT ... FOR UPDATE) para que dos
     * reasignaciones concurrentes (dos cancelaciones casi simultáneas) no
     * puedan tomar el mismo candidato de la lista de espera.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from AppointmentEntity a where a.status = :status and a.specialty = :specialty " +
            "order by a.priority desc, a.createdAt asc")
    List<AppointmentEntity> findByStatusAndSpecialtyOrderByPriorityDescCreatedAtAscForUpdate(
            @Param("status") String status, @Param("specialty") String specialty);
}
