package cl.rednorte.ms_usuarios.dto;

import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private UUID id;
    private String username;
    private String password;
    private String email;
    private boolean enabled;
    private Set<RoleDTO> roles;
}
