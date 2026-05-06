package cl.rednorte.ms_agenda_medica.controller;

import cl.rednorte.ms_agenda_medica.dto.AppointmentDTO;
import cl.rednorte.ms_agenda_medica.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointment(@PathVariable String id) {
        return appointmentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.findAll());
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDTO>> getByPatientId(@PathVariable String patientId) {
        return ResponseEntity.ok(appointmentService.findByPatientId(patientId));
    }

    @GetMapping("/practitioner/{practitionerId}")
    public ResponseEntity<List<AppointmentDTO>> getByPractitionerId(@PathVariable String practitionerId) {
        return ResponseEntity.ok(appointmentService.findByPractitionerId(practitionerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDTO> updateAppointment(@PathVariable String id, @RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
