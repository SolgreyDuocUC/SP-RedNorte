package cl.rednorte.ms_paciente.fhir.controller;

import ca.uhn.fhir.context.FhirContext;
import cl.rednorte.ms_paciente.fhir.PatientFhirQueryService;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.OperationOutcome;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint FHIR R4 sobre {@code /Patient}. Tokens emitidos por
 * ms-login-user; aquí se validan vía Resource Server (configurado en
 * {@link cl.rednorte.ms_paciente.config.SecurityConfig}).
 */
@RestController
@RequiredArgsConstructor
public class PatientFhirController {

    private static final String FHIR_JSON = "application/fhir+json";

    private final PatientFhirQueryService patientFhirQueryService;
    private final FhirContext fhirContext;

    @GetMapping(value = "/Patient/{id}", produces = FHIR_JSON)
    @PreAuthorize("hasAnyRole('MEDICO_URGENCIA','ENFERMERA_URGENCIA') " +
                  "or (hasRole('PATIENT') and #id == authentication.token.claims['patient_id'])")
    public ResponseEntity<String> getPatient(@PathVariable String id) {
        return patientFhirQueryService.findAsFhirJson(id)
                .map(body -> ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(FHIR_JSON))
                        .body(body))
                .orElseGet(() -> fhirError(404, OperationOutcome.IssueType.NOTFOUND,
                        "Patient/" + id + " no encontrado"));
    }

    private ResponseEntity<String> fhirError(int status, OperationOutcome.IssueType code, String diagnostics) {
        OperationOutcome oo = new OperationOutcome();
        oo.addIssue()
                .setSeverity(OperationOutcome.IssueSeverity.ERROR)
                .setCode(code)
                .setDiagnostics(diagnostics);
        return ResponseEntity.status(status)
                .contentType(MediaType.parseMediaType(FHIR_JSON))
                .body(fhirContext.newJsonParser().encodeResourceToString(oo));
    }
}
