package cl.rednorte.mspaciente.service;

import cl.rednorte.mspaciente.dto.PatientDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PatientService {
    PatientDTO createPatient(PatientDTO patientDTO);
    PatientDTO updatePatient(String id, PatientDTO patientDTO);
    PatientDTO getPatientById(String id);
    List<PatientDTO> getAllPatients();
    Page<PatientDTO> getAllPatientsPaged(int page, int size);
    List<PatientDTO> findByLastName(String lastName);
    PatientDTO findByIdentifier(String type, String value);
    List<PatientDTO> searchAdvanced(String name, String run, String coverageProvider);
    void deactivatePatient(String id);
    void deletePatient(String id);
}
