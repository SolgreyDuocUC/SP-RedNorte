package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.RoleDTO;
import java.util.List;
import java.util.UUID;

public interface RoleService {
    RoleDTO save(RoleDTO roleDTO);

    RoleDTO findById(UUID id);

    List<RoleDTO> findAll();
}
