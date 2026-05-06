package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.dto.CoverageDTO;
import cl.rednorte.ms_paciente.service.CoverageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/coverages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CoverageController {

        private final CoverageService coverageService;

        @GetMapping
        public ResponseEntity<List<CoverageDTO>> getAllCoverages() {
                return ResponseEntity.ok(coverageService.findAll());
        }

        @PostMapping
        public ResponseEntity<CoverageDTO> createCoverage(@RequestBody CoverageDTO coverageDTO) {
                return ResponseEntity.ok(coverageService.create(coverageDTO));
        }
}
