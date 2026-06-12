package cl.rednorte.ms_usuarios.dto.auth;

import java.util.Set;
import java.util.UUID;

public record LoginResponseDTO(
        String token,
        UserInfo user
) {
    public record UserInfo(
            UUID id,
            String username,
            String email,
            Set<String> roles
    ) {}
}
