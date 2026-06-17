package cl.rednorte.ms_paciente.service;

import cl.rednorte.ms_paciente.dto.PatientContactDTO;
import cl.rednorte.ms_paciente.dto.PatientDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PatientService {

    PatientDTO create(PatientDTO dto);

    boolean matchesPassword(String rawPassword, String encodedPassword);

    Optional<PatientDTO> findByIdentifier(String type, String value);
    
    Optional<cl.rednorte.ms_paciente.model.PatientEntity> findEntityByIdentifier(String type, String value);

    Optional<PatientDTO> findById(String id);

    PatientDTO createOrUpdate(PatientDTO dto);

    PatientDTO update(String id, PatientDTO dto);

    /**
     * Actualiza solo datos de contacto (phone, email, address). NO toca
     * campos clínicos ni el identifier. Usado por el flujo del paciente
     * auto-autenticado para mantener sus datos al día.
     */
    PatientDTO updateContact(String id, PatientContactDTO dto);

    void delete(String id);

    Page<PatientDTO> findAll(Pageable pageable);
}
