package cl.rednorte.ms_usuarios.service.Impl;

import cl.rednorte.ms_usuarios.dto.UserDTO;
import cl.rednorte.ms_usuarios.exception.BusinessException;
import cl.rednorte.ms_usuarios.exception.ResourceNotFoundException;
import cl.rednorte.ms_usuarios.model.UserEntity;
import cl.rednorte.ms_usuarios.model.mapper.UserMapper;
import cl.rednorte.ms_usuarios.model.RoleEntity;
import cl.rednorte.ms_usuarios.repository.RoleRepository;
import cl.rednorte.ms_usuarios.repository.UserRepository;
import cl.rednorte.ms_usuarios.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDTO save(UserDTO userDTO) {
        if (repository.existsByRun(userDTO.getRun())) {
            throw new BusinessException("El RUN ya existe");
        }
        if (repository.existsByEmail(userDTO.getEmail())) {
            throw new BusinessException("El email ya existe");
        }

        UserEntity entity = mapper.toEntity(userDTO);
        if (userDTO.getPassword() != null) {
            entity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        if (userDTO.getRoles() != null) {
            Set<RoleEntity> managedRoles = userDTO.getRoles().stream()
                    .map(roleDto -> roleRepository.findByName(roleDto.getName())
                            .orElseGet(() -> roleRepository.save(RoleEntity.builder().name(roleDto.getName()).build())))
                    .collect(Collectors.toSet());
            entity.setRoles(managedRoles);
        }

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

        existing.setRun(userDTO.getRun());
        existing.setNombre(userDTO.getNombre());
        existing.setSegundoNombre(userDTO.getSegundoNombre());
        existing.setApellidoPaterno(userDTO.getApellidoPaterno());
        existing.setApellidoMaterno(userDTO.getApellidoMaterno());
        existing.setNumeroTelefono(userDTO.getNumeroTelefono());
        existing.setDireccion(userDTO.getDireccion());
        existing.setEmail(userDTO.getEmail());
        existing.setEnabled(userDTO.isEnabled());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(userDTO.getPassword()));
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

    @Override
    @Transactional(readOnly = true)
    public UserEntity findEntityByRun(String run) {
        return repository.findByRun(run)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con RUN: " + run));
    }

    @Override
    public boolean matchesPassword(String raw, String encoded) {
        return passwordEncoder.matches(raw, encoded);
    }
}
