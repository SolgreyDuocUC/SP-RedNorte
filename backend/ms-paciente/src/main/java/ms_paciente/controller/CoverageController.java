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

    @PostMapping("/patients/{patientId}/coverages")
    public ResponseEntity<CoverageDTO> createCoverage(@PathVariable String patientId, @Valid @RequestBody CoverageDTO coverageDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(coverageService.createCoverage(patientId, coverageDTO));
    }

    @GetMapping("/patients/{patientId}/coverages")
    public ResponseEntity<List<CoverageDTO>> getCoveragesByPatientId(@PathVariable String patientId) {
        return ResponseEntity.ok(coverageService.getCoveragesByPatientId(patientId));
    }

    @DeleteMapping("/coverages/{id}")
    public ResponseEntity<Void> deleteCoverage(@PathVariable String id) {
        coverageService.deleteCoverage(id);
        return ResponseEntity.noContent().build();
    }
}
