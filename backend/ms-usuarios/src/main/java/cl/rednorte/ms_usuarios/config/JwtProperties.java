package cl.rednorte.ms_usuarios.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Configuración del JWT que ms-usuarios emite al autenticar (HS256).
 * En prod, APP_JWT_SECRET debe sobreescribirse con un secreto fuerte.
 */
@Data
@ConfigurationProperties(prefix = "app.security.jwt")
public class JwtProperties {

    private String secret = "dev-only-insecure-secret-change-me-please-32bytes";

    private Duration expiration = Duration.ofHours(8);
}
