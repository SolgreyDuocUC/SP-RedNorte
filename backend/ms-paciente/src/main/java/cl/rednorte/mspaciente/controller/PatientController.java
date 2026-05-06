package cl.rednorte.mspaciente.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import cl.rednorte.mspaciente.dto.PatientDTO;
import cl.rednorte.mspaciente.service.PatientService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientService patientService;

    // RF48 — Registro de paciente
    @PostMapping
    public ResponseEntity<PatientDTO> createPatient(@Valid @RequestBody PatientDTO patientDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.createPatient(patientDTO));
    }

    // RF51 — Consulta por ID
    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable String id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    // RF58 — Listado de pacientes con paginación
    @GetMapping
    public ResponseEntity<Page<PatientDTO>> getAllPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(patientService.getAllPatientsPaged(page, size));
    }

    // RF49 — Actualización de datos del paciente
    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO> updatePatient(@PathVariable String id,
            @Valid @RequestBody PatientDTO patientDTO) {
        return ResponseEntity.ok(patientService.updatePatient(id, patientDTO));
    }

    // RF57 — Desactivación lógica de paciente
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> deactivatePatient(@PathVariable String id) {
        patientService.deactivatePatient(id);
        return ResponseEntity.noContent().build();
    }

    // Admin: eliminación física
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    // RF50 — Consulta por identificador (RUN, DNI, PASSPORT)
    @GetMapping("/search")
    public ResponseEntity<PatientDTO> findByIdentifier(@RequestParam String type,
            @RequestParam String value) {
        return ResponseEntity.ok(patientService.findByIdentifier(type, value));
    }

    // RF59 — Búsqueda avanzada por nombre, RUN y previsión
    @GetMapping("/search/advanced")
    public ResponseEntity<List<PatientDTO>> searchAdvanced(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String run,
            @RequestParam(required = false) String provider) {
        return ResponseEntity.ok(patientService.searchAdvanced(name, run, provider));
    }
}
