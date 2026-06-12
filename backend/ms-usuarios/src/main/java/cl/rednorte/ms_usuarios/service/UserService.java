package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.UserDTO;
import java.util.List;
import java.util.UUID;

public interface UserService {
    UserDTO save(UserDTO userDTO);

    UserDTO findById(UUID id);

    List<UserDTO> findAll();

    UserDTO update(UUID id, UserDTO userDTO);

    void delete(UUID id);

    cl.rednorte.ms_usuarios.model.UserEntity findEntityByEmail(String email);

    boolean matchesPassword(String rawPassword, String encodedPassword);
}
