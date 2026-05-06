package ms_paciente.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ms_paciente.dto.CoverageDTO;
import ms_paciente.service.CoverageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/coverages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CoverageController {

    private final CoverageService coverageService;

    // RF55 — Asociación paciente-previsión
    @PostMapping("/patient/{patientId}")
    public ResponseEntity<CoverageDTO> createCoverage(@PathVariable String patientId,
            @Valid @RequestBody CoverageDTO coverageDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(coverageService.createCoverage(patientId, coverageDTO));
    }

    // RF54 — Actualización de previsión
    @PutMapping("/{id}")
    public ResponseEntity<CoverageDTO> updateCoverage(@PathVariable String id,
            @Valid @RequestBody CoverageDTO coverageDTO) {
        return ResponseEntity.ok(coverageService.updateCoverage(id, coverageDTO));
    }

    // RF54 — Consulta de previsión por paciente
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<CoverageDTO>> getCoveragesByPatientId(@PathVariable String patientId) {
        return ResponseEntity.ok(coverageService.getCoveragesByPatientId(patientId));
    }

    // RF54 — Eliminación de previsión
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoverage(@PathVariable String id) {
        coverageService.deleteCoverage(id);
        return ResponseEntity.noContent().build();
    }
}
