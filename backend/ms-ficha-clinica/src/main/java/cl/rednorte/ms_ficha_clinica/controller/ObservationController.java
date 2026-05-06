package cl.rednorte.ms_ficha_clinica.controller;

import cl.rednorte.ms_ficha_clinica.dto.ObservationDTO;
import cl.rednorte.ms_ficha_clinica.service.ObservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/observations")
@RequiredArgsConstructor
public class ObservationController {

    private final ObservationService observationService;

    @PostMapping
    public ResponseEntity<ObservationDTO> createObservation(
            @Valid @RequestBody ObservationDTO observationDTO) {

        ObservationDTO created = observationService.createObservation(observationDTO);

        return ResponseEntity
                .created(URI.create("/api/v1/observations/" + created.getId()))
                .body(created);
    }

    @GetMapping
    public ResponseEntity<List<ObservationDTO>> getAllObservations() {
        List<ObservationDTO> observations = observationService.getAllObservations();

        if (observations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(observations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObservationDTO> getObservationById(@PathVariable String id) {
        ObservationDTO observation = observationService.getObservationById(id);
        return ResponseEntity.ok(observation);
    }

    @GetMapping("/patient/{patientId}/history")
    public ResponseEntity<List<ObservationDTO>> getObservationHistory(
            @PathVariable String patientId) {

        List<ObservationDTO> observations = observationService.getObservationHistory(patientId);

        return observations.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(observations);
    }

    @GetMapping("/encounter/{encounterId}")
    public ResponseEntity<List<ObservationDTO>> getObservationsByEncounterId(
            @PathVariable String encounterId) {

        List<ObservationDTO> observations = observationService.getObservationsByEncounterId(encounterId);

        return observations.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(observations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ObservationDTO> updateObservation(
            @PathVariable String id,
            @Valid @RequestBody ObservationDTO observationDTO) {

        ObservationDTO updated = observationService.updateObservation(id, observationDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteObservation(@PathVariable String id) {
        observationService.deleteObservation(id);
        return ResponseEntity.noContent().build();
    }
}