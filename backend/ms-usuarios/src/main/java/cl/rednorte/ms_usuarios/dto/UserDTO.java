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
    private String run;
    private String nombre;
    private String segundoNombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String numeroTelefono;
    private String direccion;
    private String password;
    private String email;
    private boolean enabled;
    private Set<RoleDTO> roles;
}
