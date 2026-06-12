package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.auth.LoginRequestDTO;
import cl.rednorte.ms_usuarios.dto.auth.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO login(LoginRequestDTO request);
}
