package cl.rednorte.ms_ficha_clinica.service;

import cl.rednorte.ms_ficha_clinica.dto.ClinicalNoteDTO;

import java.util.List;

public interface ClinicalNoteService {
    ClinicalNoteDTO createClinicalNote(ClinicalNoteDTO clinicalNoteDTO);

    ClinicalNoteDTO getClinicalNoteById(String id);

    List<ClinicalNoteDTO> getClinicalNotesByPatientId(String patientId);

    List<ClinicalNoteDTO> getClinicalNotesByEncounterId(String encounterId);

    void deleteClinicalNote(String id);
}
