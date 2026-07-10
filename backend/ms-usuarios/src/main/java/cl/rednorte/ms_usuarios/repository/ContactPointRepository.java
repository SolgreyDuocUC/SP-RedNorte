package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.ContactPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactPointRepository extends JpaRepository<ContactPoint, Integer> {

}
