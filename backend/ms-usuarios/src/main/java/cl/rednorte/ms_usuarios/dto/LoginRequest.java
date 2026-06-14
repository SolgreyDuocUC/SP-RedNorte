package cl.rednorte.ms_usuarios.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String run;
    private String password;
}
