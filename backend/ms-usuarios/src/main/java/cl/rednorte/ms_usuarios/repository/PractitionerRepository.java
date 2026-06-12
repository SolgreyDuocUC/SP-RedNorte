package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Integer> {

    Optional<Practitioner> findByRunPractitioner(String runPractitioner);

    List<Practitioner> findByFirstNamePractitionerContainingIgnoreCase(String firstNamePractitioner);
}
