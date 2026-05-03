package cl.rednorte.ms_ficha_clinica.service;

import cl.rednorte.ms_ficha_clinica.dto.ConditionDTO;

import java.util.List;

public interface ConditionService {
    ConditionDTO createCondition(ConditionDTO conditionDTO);

    ConditionDTO getConditionById(String id);

    List<ConditionDTO> getConditionsByPatientId(String patientId);

    List<ConditionDTO> getConditionsByEncounterId(String encounterId);

    List<ConditionDTO> getConditionHistory(String patientId);

    void deleteCondition(String id);
}
