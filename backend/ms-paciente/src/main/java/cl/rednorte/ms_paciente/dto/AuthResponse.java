package cl.rednorte.ms_paciente.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String id;
    private String identifierValue;
    private List<String> roles;
    private String accessToken;
    private String refreshToken;
}
