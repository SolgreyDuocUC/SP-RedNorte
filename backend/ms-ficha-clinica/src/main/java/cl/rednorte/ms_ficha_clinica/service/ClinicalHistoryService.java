package cl.rednorte.ms_ficha_clinica.service;

import cl.rednorte.ms_ficha_clinica.dto.ClinicalHistoryDTO;

public interface ClinicalHistoryService {
    ClinicalHistoryDTO getFullClinicalHistory(String patientId);
}
