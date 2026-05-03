package ms_paciente.service;

import ms_paciente.dto.PatientDTO;
import java.util.List;

public interface PatientService {
    PatientDTO createPatient(PatientDTO patientDTO);
    PatientDTO updatePatient(String id, PatientDTO patientDTO);
    PatientDTO getPatientById(String id);
    List<PatientDTO> getAllPatients();
    List<PatientDTO> findByLastName(String lastName);
    PatientDTO findByIdentifier(String type, String value);
    void deletePatient(String id);
}
