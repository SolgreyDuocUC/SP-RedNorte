package cl.rednorte.ms_paciente.fhir;

import ca.uhn.fhir.context.FhirContext;
import cl.rednorte.ms_paciente.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Lee {@code PatientEntity} y devuelve su representación FHIR R4 JSON.
 * Transacción de solo lectura para asegurar la sesión JPA está activa
 * mientras se mapea.
 */
@Service
@RequiredArgsConstructor
public class PatientFhirQueryService {

    private final PatientRepository patientRepository;
    private final PatientFhirMapper mapper;
    private final FhirContext fhirContext;

    @Transactional(readOnly = true)
    public Optional<String> findAsFhirJson(String id) {
        return patientRepository.findById(id).map(p -> {
            org.hl7.fhir.r4.model.Patient fhir = mapper.toFhir(p);
            return fhirContext.newJsonParser().encodeResourceToString(fhir);
        });
    }
}
