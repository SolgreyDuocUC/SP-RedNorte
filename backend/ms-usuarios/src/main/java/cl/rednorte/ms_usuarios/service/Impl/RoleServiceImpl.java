package cl.rednorte.ms_usuarios.service.Impl;

import cl.rednorte.ms_usuarios.dto.RoleDTO;
import cl.rednorte.ms_usuarios.exception.BusinessException;
import cl.rednorte.ms_usuarios.exception.ResourceNotFoundException;
import cl.rednorte.ms_usuarios.model.RoleEntity;
import cl.rednorte.ms_usuarios.model.mapper.UserMapper;
import cl.rednorte.ms_usuarios.repository.RoleRepository;
import cl.rednorte.ms_usuarios.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository repository;
    private final UserMapper mapper;

    @Override
    @Transactional
    public RoleDTO save(RoleDTO roleDTO) {
        if (repository.existsByName(roleDTO.getName())) {
            throw new BusinessException("El rol ya existe");
        }
        RoleEntity entity = mapper.toEntity(roleDTO);
        return mapper.toDto(repository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public RoleDTO findById(UUID id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado con ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
