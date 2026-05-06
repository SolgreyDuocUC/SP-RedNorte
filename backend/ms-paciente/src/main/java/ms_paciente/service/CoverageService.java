package ms_paciente.service;

import ms_paciente.dto.CoverageDTO;
import java.util.List;

public interface CoverageService {
    CoverageDTO createCoverage(String patientId, CoverageDTO coverageDTO);
    CoverageDTO updateCoverage(String id, CoverageDTO coverageDTO);
    List<CoverageDTO> getCoveragesByPatientId(String patientId);
    void deleteCoverage(String id);
}



