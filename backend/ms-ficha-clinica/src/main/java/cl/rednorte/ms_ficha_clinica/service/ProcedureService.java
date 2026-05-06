package cl.rednorte.ms_ficha_clinica.service;

import cl.rednorte.ms_ficha_clinica.dto.ProcedureDTO;

import java.util.List;

public interface ProcedureService {
    ProcedureDTO createProcedure(ProcedureDTO procedureDTO);

    ProcedureDTO getProcedureById(String id);

    List<ProcedureDTO> getProceduresByPatientId(String patientId);

    List<ProcedureDTO> getProceduresByEncounterId(String encounterId);

    void deleteProcedure(String id);
}
