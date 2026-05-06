package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.dto.PatientDTO;
import cl.rednorte.ms_paciente.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<PatientDTO> createPatient(@RequestBody PatientDTO dto) {
        return ResponseEntity.ok(patientService.create(dto));
    }

    @PutMapping("/upsert")
    public ResponseEntity<PatientDTO> createOrUpdate(@RequestBody PatientDTO dto) {
        return ResponseEntity.ok(patientService.createOrUpdate(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO> updatePatient(@PathVariable String id, @RequestBody PatientDTO dto) {
        return ResponseEntity.ok(patientService.update(id, dto));
    }

    @GetMapping("/identifier/{type}/{value}")
    public ResponseEntity<PatientDTO> findByIdentifier(@PathVariable String type, @PathVariable String value) {
        Optional<PatientDTO> patient = patientService.findByIdentifier(type, value);
        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> findById(@PathVariable String id) {
        Optional<PatientDTO> patient = patientService.findById(id);
        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<PatientDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(patientService.findAll(pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
