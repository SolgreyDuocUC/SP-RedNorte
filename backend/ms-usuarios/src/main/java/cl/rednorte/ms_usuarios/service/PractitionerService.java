package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.PractitionerDTO;
import java.util.List;
import java.util.Optional;

public interface PractitionerService {
    List<PractitionerDTO> findAll();

    Optional<PractitionerDTO> findById(int id);

    List<PractitionerDTO> findByName(String name);

    Optional<PractitionerDTO> findByRun(String run);

    PractitionerDTO save(PractitionerDTO practitionerDTO);

    PractitionerDTO update(int id, PractitionerDTO practitionerDTO);

    void deleteById(int id);
}
