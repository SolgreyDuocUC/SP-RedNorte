package cl.rednorte.ms_reservas.repository;

import cl.rednorte.ms_reservas.model.SlotEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<SlotEntity, String> {

    List<SlotEntity> findBySpecialtyAndStatus(String specialty, String status);

    List<SlotEntity> findByPractitionerId(String practitionerId);

    List<SlotEntity> findByStatus(String status);
}
