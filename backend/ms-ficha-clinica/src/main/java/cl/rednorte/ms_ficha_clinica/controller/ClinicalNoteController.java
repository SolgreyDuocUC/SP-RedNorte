package cl.rednorte.ms_ficha_clinica.controller;

import cl.rednorte.ms_ficha_clinica.dto.ClinicalNoteDTO;
import cl.rednorte.ms_ficha_clinica.service.ClinicalNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clinical-notes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClinicalNoteController {

    private final ClinicalNoteService clinicalNoteService;

    @PostMapping
    public ResponseEntity<ClinicalNoteDTO> createClinicalNote(@RequestBody ClinicalNoteDTO clinicalNoteDTO) {
        return ResponseEntity.ok(clinicalNoteService.createClinicalNote(clinicalNoteDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicalNoteDTO> getClinicalNoteById(@PathVariable String id) {
        ClinicalNoteDTO clinicalNote = clinicalNoteService.getClinicalNoteById(id);
        return clinicalNote != null ? ResponseEntity.ok(clinicalNote) : ResponseEntity.notFound().build();
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<ClinicalNoteDTO>> getClinicalNotesByPatientId(@PathVariable String patientId) {
        return ResponseEntity.ok(clinicalNoteService.getClinicalNotesByPatientId(patientId));
    }

    @GetMapping("/encounter/{encounterId}")
    public ResponseEntity<List<ClinicalNoteDTO>> getClinicalNotesByEncounterId(@PathVariable String encounterId) {
        return ResponseEntity.ok(clinicalNoteService.getClinicalNotesByEncounterId(encounterId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinicalNote(@PathVariable String id) {
        clinicalNoteService.deleteClinicalNote(id);
        return ResponseEntity.noContent().build();
    }
}
