package cl.rednorte.ms_paciente.fhir;

import ca.uhn.fhir.context.FhirContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Singleton {@link FhirContext} (thread-safe, caro de construir).
 * Compartido por mapper y controller para serializar a FHIR R4.
 */
@Configuration
public class FhirContextConfig {

    @Bean
    public FhirContext fhirContext() {
        return FhirContext.forR4();
    }
}
