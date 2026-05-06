package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.ClinicalHistoryDTO;
import cl.rednorte.ms_ficha_clinica.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClinicalHistoryServiceImpl implements ClinicalHistoryService {

    private final EncounterService encounterService;
    private final ObservationService observationService;
    private final ConditionService conditionService;
    private final ProcedureService procedureService;
    private final ClinicalNoteService clinicalNoteService;

    @Override
    public ClinicalHistoryDTO getFullClinicalHistory(String patientId) {
        return ClinicalHistoryDTO.builder()
                .patientId(patientId)
                .encounters(encounterService.getEncountersByPatientId(patientId))
                .observations(observationService.getObservationsByPatientId(patientId))
                .conditions(conditionService.getConditionsByPatientId(patientId))
                .procedures(procedureService.getProceduresByPatientId(patientId))
                .clinicalNotes(clinicalNoteService.getClinicalNotesByPatientId(patientId))
                .build();
    }
}
