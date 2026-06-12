package cl.rednorte.ms_paciente;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles("dev-h2")
@TestPropertySource(properties = {
		"spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:1/.well-known/jwks.json"
})
class MsPacienteApplicationTests {

	@Test
	void contextLoads() {
	}

}
