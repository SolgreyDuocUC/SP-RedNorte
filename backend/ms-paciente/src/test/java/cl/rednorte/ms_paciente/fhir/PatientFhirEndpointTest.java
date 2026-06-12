package cl.rednorte.ms_paciente.fhir;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integración del endpoint FHIR /Patient/{id}. Usa el post-processor
 * jwt() para inyectar un principal sintético — sin necesidad de levantar
 * ms-login-user ni stub de JWKS.
 *
 * jwk-set-uri apunta a un dummy para que el contexto cargue sin fetch real.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev-h2")
@TestPropertySource(properties = {
        "spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:1/.well-known/jwks.json"
})
class PatientFhirEndpointTest {

    @Autowired MockMvc mvc;

    @Test
    void getPatient_sinToken_devuelve401() throws Exception {
        mvc.perform(get("/Patient/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getPatient_conRolMedico_retornaPatientFhir() throws Exception {
        mvc.perform(get("/Patient/1")
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_MEDICO_URGENCIA"))))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith("application/fhir+json"))
                .andExpect(jsonPath("$.resourceType").value("Patient"))
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.identifier[0].system")
                        .value(PatientFhirMapper.SYS_RUN))
                .andExpect(jsonPath("$.identifier[0].value").value("12345678-9"))
                .andExpect(jsonPath("$.gender").value("male"))
                .andExpect(jsonPath("$.name[0].family").value("Pérez"))
                .andExpect(jsonPath("$.name[0].given[0]").value("Juan"));
    }

    @Test
    void getPatient_conRolEnfermera_tambienPermitido() throws Exception {
        mvc.perform(get("/Patient/1")
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ENFERMERA_URGENCIA"))))
                .andExpect(status().isOk());
    }

    @Test
    void getPatient_conRolAdminNoClinico_devuelve403() throws Exception {
        mvc.perform(get("/Patient/1")
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
                .andExpect(status().isForbidden());
    }

    @Test
    void getPatient_conRolPatientMismoId_retorna200() throws Exception {
        mvc.perform(get("/Patient/1")
                        .with(jwt()
                                .jwt(j -> j.claim("patient_id", "1"))
                                .authorities(new SimpleGrantedAuthority("ROLE_PATIENT"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resourceType").value("Patient"))
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void getPatient_conRolPatientOtroId_devuelve403() throws Exception {
        mvc.perform(get("/Patient/1")
                        .with(jwt()
                                .jwt(j -> j.claim("patient_id", "OTRO-99"))
                                .authorities(new SimpleGrantedAuthority("ROLE_PATIENT"))))
                .andExpect(status().isForbidden());
    }

    @Test
    void getPatient_idInexistente_devuelve404OperationOutcome() throws Exception {
        mvc.perform(get("/Patient/no-existe")
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_MEDICO_URGENCIA"))))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.resourceType").value("OperationOutcome"))
                .andExpect(jsonPath("$.issue[0].code").value("not-found"));
    }
}
