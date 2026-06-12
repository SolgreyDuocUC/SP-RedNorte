package cl.rednorte.ms_usuarios.integration.loginuser;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Configuración del cliente HTTP hacia ms-login-user.
 * En dev defaults a localhost:8087; en prod se inyecta por env.
 */
@Data
@ConfigurationProperties(prefix = "app.login-user")
public class LoginUserClientProperties {

    /** URL base de ms-login-user (sin slash final). */
    private String baseUrl = "http://localhost:8087";

    /** Bearer token de servicio para autorización inter-MS. */
    private String token;

    private Duration connectTimeout = Duration.ofSeconds(2);
    private Duration readTimeout = Duration.ofSeconds(5);
}
