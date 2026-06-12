package cl.rednorte.ms_reservas.controller;

import cl.rednorte.ms_reservas.dto.SlotDTO;
import cl.rednorte.ms_reservas.service.SlotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/slots")
@RequiredArgsConstructor
public class SlotController {

    private final SlotService slotService;

    @PostMapping
    public ResponseEntity<SlotDTO> createSlot(@Valid @RequestBody SlotDTO dto) {
        return ResponseEntity.ok(slotService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SlotDTO> getSlot(@PathVariable String id) {
        return slotService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<SlotDTO>> getAllSlots() {
        return ResponseEntity.ok(slotService.findAll());
    }

    @GetMapping("/available")
    public ResponseEntity<List<SlotDTO>> getAvailableSlots(@RequestParam String specialty) {
        return ResponseEntity.ok(slotService.findAvailableBySpecialty(specialty));
    }

    @GetMapping("/practitioner/{practitionerId}")
    public ResponseEntity<List<SlotDTO>> getByPractitionerId(@PathVariable String practitionerId) {
        return ResponseEntity.ok(slotService.findByPractitionerId(practitionerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SlotDTO> updateSlot(@PathVariable String id, @RequestBody SlotDTO dto) {
        return ResponseEntity.ok(slotService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable String id) {
        slotService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
