package cl.rednorte.ms_paciente.service;

import cl.rednorte.ms_paciente.dto.PatientDTO;

import java.util.Optional;

public interface PatientService {

    PatientDTO create(PatientDTO dto);

    Optional<PatientDTO> findByIdentifier(String type, String value);

    PatientDTO createOrUpdate(PatientDTO dto);
}
