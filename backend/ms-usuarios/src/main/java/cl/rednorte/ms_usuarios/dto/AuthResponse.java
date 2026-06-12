package cl.rednorte.ms_usuarios.dto;

import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private UUID id;
    private String email;
    private List<String> roles;
    private String accessToken;
    private String refreshToken;
}
