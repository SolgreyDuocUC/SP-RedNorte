package cl.rednorte.ms_usuarios.integration.fhir;

import org.hl7.fhir.r4.model.Patient;
import org.springframework.stereotype.Component;

@Component
public class UsuarioToPatientMapper {
    public Patient mapToFhir(Object usuario) {
        Patient patient = new Patient();
        // TODO: Map fields to HAPI FHIR Patient object
        return patient;
    }
}
