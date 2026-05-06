package cl.rednorte.ms_paciente.service;

import cl.rednorte.ms_paciente.dto.PatientDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PatientService {

    PatientDTO create(PatientDTO dto);

    Optional<PatientDTO> findByIdentifier(String type, String value);

    Optional<PatientDTO> findById(String id);

    PatientDTO createOrUpdate(PatientDTO dto);

    PatientDTO update(String id, PatientDTO dto);

    void delete(String id);

    Page<PatientDTO> findAll(Pageable pageable);
}
