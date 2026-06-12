package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.Deceased;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeceasedRepository extends JpaRepository<Deceased, Integer> {
}
