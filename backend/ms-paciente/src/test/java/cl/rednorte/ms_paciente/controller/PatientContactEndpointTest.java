package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * PATCH /api/v1/patients/{id}/contact: solo el propio paciente
 * (ROLE_PATIENT + patient_id que matchee) puede llamarlo. Verifica que
 * el partial update SOLO toca phone/email/address, NO clínicos.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev-h2")
@TestPropertySource(properties = {
                "spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:1/.well-known/jwks.json"
})
class PatientContactEndpointTest {

        @Autowired
        MockMvc mvc;
        @Autowired
        PatientRepository patientRepository;

        @Test
        void patchContact_conRolPatientMismoId_actualizaSoloContacto() throws Exception {
                // Sanity: nombre original del seed antes del patch.
                String firstNameAntes = patientRepository.findById("1").orElseThrow().getFirstName();

                mvc.perform(patch("/api/v1/patients/1/contact")
                                .with(jwt()
                                                .jwt(j -> j.claim("patient_id", "1"))
                                                .authorities(new SimpleGrantedAuthority("ROLE_PATIENT")))
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                {"phone":"+56987654321","email":"juan.nuevo@example.cl"}
                                                """))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.phone").value("+56987654321"))
                                .andExpect(jsonPath("$.email").value("juan.nuevo@example.cl"));

                // El paciente persistido tiene los nuevos contactos pero conserva
                // nombre/identifier.
                var p = patientRepository.findById("1").orElseThrow();
                assertThat(p.getPhone()).isEqualTo("+56987654321");
                assertThat(p.getEmail()).isEqualTo("juan.nuevo@example.cl");
                assertThat(p.getFirstName()).isEqualTo(firstNameAntes);
                assertThat(p.getIdentifierValue()).isEqualTo("12345678-9");
        }

        @Test
        void patchContact_conRolPatientOtroId_devuelve403() throws Exception {
                mvc.perform(patch("/api/v1/patients/1/contact")
                                .with(jwt()
                                                .jwt(j -> j.claim("patient_id", "OTRO-99"))
                                                .authorities(new SimpleGrantedAuthority("ROLE_PATIENT")))
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                {"phone":"+56000000000"}
                                                """))
                                .andExpect(status().isForbidden());
        }
}
