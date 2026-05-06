package cl.rednorte.ms_usuarios.service.Impl;

import cl.rednorte.ms_usuarios.dto.UserDTO;
import cl.rednorte.ms_usuarios.exception.BusinessException;
import cl.rednorte.ms_usuarios.exception.ResourceNotFoundException;
import cl.rednorte.ms_usuarios.model.UserEntity;
import cl.rednorte.ms_usuarios.model.mapper.UserMapper;
import cl.rednorte.ms_usuarios.repository.UserRepository;
import cl.rednorte.ms_usuarios.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserMapper mapper;

    @Override
    @Transactional
    public UserDTO save(UserDTO userDTO) {
        if (repository.existsByUsername(userDTO.getUsername())) {
            throw new BusinessException("El nombre de usuario ya existe");
        }
        if (repository.existsByEmail(userDTO.getEmail())) {
            throw new BusinessException("El email ya existe");
        }

        UserEntity entity = mapper.toEntity(userDTO);
        // En un MVP real sin tokens, la contraseña debería encriptarse,
        // pero el usuario pidió algo funcional rápido.
        return mapper.toDto(repository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO findById(UUID id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserDTO update(UUID id, UserDTO userDTO) {
        UserEntity existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));

        existing.setUsername(userDTO.getUsername());
        existing.setEmail(userDTO.getEmail());
        existing.setEnabled(userDTO.isEnabled());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            existing.setPassword(userDTO.getPassword());
        }

        return mapper.toDto(repository.save(existing));
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
