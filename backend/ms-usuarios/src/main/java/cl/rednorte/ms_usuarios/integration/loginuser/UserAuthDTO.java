package cl.rednorte.ms_usuarios.integration.loginuser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Set;

/**
 * Forma del JSON que devuelve {@code GET /internal/users/by-username/{u}}
 * en ms-login-user. Solo campos seguros — nunca password ni mfa_secret.
 * {@code @JsonIgnoreProperties(ignoreUnknown=true)} para que cambios
 * aditivos del lado emisor no rompan a este consumidor.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserAuthDTO(
        Long userId,
        String username,
        String email,
        boolean active,
        Set<String> roles
) {}
