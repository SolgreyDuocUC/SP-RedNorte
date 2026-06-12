package cl.rednorte.ms_usuarios.integration.loginuser;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.util.Optional;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Integración del UserServiceClient contra un ms-login-user simulado con
 * WireMock. Cubre 200/404/5xx para que el cliente devuelva el DTO esperado
 * o burbujee error sin romper.
 */
@SpringBootTest
@ActiveProfiles("dev")
class UserServiceClientTest {

    private static final WireMockServer wireMockServer;

    static {
        wireMockServer = new WireMockServer(WireMockConfiguration.options().dynamicPort());
        wireMockServer.start();
        Runtime.getRuntime().addShutdownHook(new Thread(wireMockServer::stop));
    }

    @Autowired UserServiceClient client;

    @BeforeEach
    void resetStubs() {
        wireMockServer.resetAll();
    }

    @DynamicPropertySource
    static void registerStubs(DynamicPropertyRegistry registry) {
        registry.add("app.login-user.base-url", wireMockServer::baseUrl);
        registry.add("app.login-user.token", () -> "dummy-test-token");
        // Dummy jwk-set-uri para que el contexto cargue sin fetch real.
        registry.add("app.jwt.jwk-set-uri", () -> "http://localhost:1/.well-known/jwks.json");
    }

    @Test
    void findByUsername_ok_retornaUserAuthDto() {
        wireMockServer.stubFor(WireMock.get(urlEqualTo("/internal/users/by-username/medico.demo"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                                {
                                  "userId": 1,
                                  "username": "medico.demo",
                                  "email": "medico.demo@rednorte.cl",
                                  "active": true,
                                  "roles": ["MEDICO_URGENCIA"]
                                }
                                """)));

        Optional<UserAuthDTO> result = client.findByUsername("medico.demo");

        assertThat(result).isPresent();
        UserAuthDTO dto = result.get();
        assertThat(dto.userId()).isEqualTo(1L);
        assertThat(dto.username()).isEqualTo("medico.demo");
        assertThat(dto.email()).isEqualTo("medico.demo@rednorte.cl");
        assertThat(dto.active()).isTrue();
        assertThat(dto.roles()).containsExactly("MEDICO_URGENCIA");
    }

    @Test
    void findByUsername_404_retornaEmpty() {
        wireMockServer.stubFor(WireMock.get(urlEqualTo("/internal/users/by-username/no-existe"))
                .willReturn(aResponse().withStatus(404)));

        Optional<UserAuthDTO> result = client.findByUsername("no-existe");

        assertThat(result).isEmpty();
    }

    @Test
    void findByUsername_5xx_lanzaExcepcion() {
        wireMockServer.stubFor(WireMock.get(urlEqualTo("/internal/users/by-username/medico.demo"))
                .willReturn(aResponse().withStatus(500)));

        assertThatThrownBy(() -> client.findByUsername("medico.demo"))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void findByUsername_camposExtraEnRespuesta_seIgnoran() {
        // Verifica @JsonIgnoreProperties(ignoreUnknown=true).
        wireMockServer.stubFor(WireMock.get(urlEqualTo("/internal/users/by-username/medico.demo"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                                {
                                  "userId": 1,
                                  "username": "medico.demo",
                                  "email": "medico.demo@rednorte.cl",
                                  "active": true,
                                  "roles": ["MEDICO_URGENCIA"],
                                  "campoNuevo": "ignorame",
                                  "otroCampo": 42
                                }
                                """)));

        Optional<UserAuthDTO> result = client.findByUsername("medico.demo");

        assertThat(result).isPresent();
        assertThat(result.get().username()).isEqualTo("medico.demo");
    }
}
