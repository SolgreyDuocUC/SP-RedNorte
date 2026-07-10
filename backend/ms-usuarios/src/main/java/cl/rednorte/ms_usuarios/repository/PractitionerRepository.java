package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.Optional;

public interface PractitionerRepository extends JpaRepository<Practitioner, Integer> {


    Optional<Practitioner> findByRunPractitioner(String runPractitioner);

    List<Practitioner> findByFirstNamePractitionerContainingIgnoreCase(String firstNamePractitioner);
}
