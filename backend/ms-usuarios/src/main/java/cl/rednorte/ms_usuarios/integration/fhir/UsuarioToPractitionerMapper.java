package cl.rednorte.ms_usuarios.integration.fhir;

import org.hl7.fhir.r4.model.Practitioner;
import org.springframework.stereotype.Component;

@Component
public class UsuarioToPractitionerMapper {
    public Practitioner mapToFhir(Object usuario) {
        Practitioner practitioner = new Practitioner();
        // TODO: Map fields to HAPI FHIR Practitioner object
        return practitioner;
    }
}
