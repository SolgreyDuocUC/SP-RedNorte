package cl.rednorte.ms_ficha_clinica.controller;

import cl.rednorte.ms_ficha_clinica.dto.ProcedureDTO;
import cl.rednorte.ms_ficha_clinica.service.ProcedureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/procedures")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProcedureController {

    private final ProcedureService procedureService;

    @PostMapping
    public ResponseEntity<ProcedureDTO> createProcedure(@RequestBody ProcedureDTO procedureDTO) {
        return ResponseEntity.ok(procedureService.createProcedure(procedureDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcedureDTO> getProcedureById(@PathVariable String id) {
        ProcedureDTO procedure = procedureService.getProcedureById(id);
        return procedure != null ? ResponseEntity.ok(procedure) : ResponseEntity.notFound().build();
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<ProcedureDTO>> getProceduresByPatientId(@PathVariable String patientId) {
        return ResponseEntity.ok(procedureService.getProceduresByPatientId(patientId));
    }

    @GetMapping("/encounter/{encounterId}")
    public ResponseEntity<List<ProcedureDTO>> getProceduresByEncounterId(@PathVariable String encounterId) {
        return ResponseEntity.ok(procedureService.getProceduresByEncounterId(encounterId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProcedure(@PathVariable String id) {
        procedureService.deleteProcedure(id);
        return ResponseEntity.noContent().build();
    }
}
