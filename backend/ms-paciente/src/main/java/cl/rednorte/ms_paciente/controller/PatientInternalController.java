package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.dto.PatientPublicDTO;
import cl.rednorte.ms_paciente.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint interno usado por ms-login-user (y eventualmente por otros MS
 * con ROLE_INTEGRACION) para resolver un paciente por su RUN. Devuelve
 * solo campos no clínicos: lo justo para enviar OTP de auto-login.
 */
@RestController
@RequestMapping("/internal/patients")
@RequiredArgsConstructor
public class PatientInternalController {

    private final PatientRepository patientRepository;

    @GetMapping("/by-rut/{rut}")
    @PreAuthorize("hasRole('INTEGRACION')")
    public ResponseEntity<PatientPublicDTO> findByRut(@PathVariable String rut) {
        return patientRepository.findByIdentifierTypeAndIdentifierValue("RUN", rut)
                .filter(p -> !Boolean.FALSE.equals(p.getActive()))
                .map(p -> new PatientPublicDTO(
                        p.getId(),
                        p.getIdentifierType(),
                        p.getIdentifierValue(),
                        p.getFirstName(),
                        p.getLastName(),
                        p.getPhone(),
                        p.getEmail()))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
