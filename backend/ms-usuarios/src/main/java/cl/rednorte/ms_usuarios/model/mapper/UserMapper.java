package cl.rednorte.ms_usuarios.model.mapper;

import cl.rednorte.ms_usuarios.dto.RoleDTO;
import cl.rednorte.ms_usuarios.dto.UserDTO;
import cl.rednorte.ms_usuarios.model.RoleEntity;
import cl.rednorte.ms_usuarios.model.UserEntity;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserDTO toDto(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        return UserDTO.builder()
                .id(entity.getId())
                .run(entity.getRun())
                .nombre(entity.getNombre())
                .segundoNombre(entity.getSegundoNombre())
                .apellidoPaterno(entity.getApellidoPaterno())
                .apellidoMaterno(entity.getApellidoMaterno())
                .numeroTelefono(entity.getNumeroTelefono())
                .direccion(entity.getDireccion())
                .password(entity.getPassword())
                .email(entity.getEmail())
                .enabled(entity.isEnabled())
                .roles(entity.getRoles() != null ? entity.getRoles().stream()
                        .map(this::toDto)
                        .collect(Collectors.toSet()) : null)
                .build();
    }

    public UserEntity toEntity(UserDTO dto) {
        if (dto == null) {
            return null;
        }

        return UserEntity.builder()
                .id(dto.getId())
                .run(dto.getRun())
                .nombre(dto.getNombre())
                .segundoNombre(dto.getSegundoNombre())
                .apellidoPaterno(dto.getApellidoPaterno())
                .apellidoMaterno(dto.getApellidoMaterno())
                .numeroTelefono(dto.getNumeroTelefono())
                .direccion(dto.getDireccion())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .enabled(dto.isEnabled())
                .roles(dto.getRoles() != null ? dto.getRoles().stream()
                        .map(this::toEntity)
                        .collect(Collectors.toSet()) : null)
                .build();
    }

    public RoleDTO toDto(RoleEntity entity) {
        if (entity == null)
            return null;

        return RoleDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public RoleEntity toEntity(RoleDTO dto) {
        if (dto == null)
            return null;

        return RoleEntity.builder()
                .id(dto.getId())
                .name(dto.getName())
                .build();
    }
}
