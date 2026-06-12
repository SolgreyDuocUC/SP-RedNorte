package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
}
