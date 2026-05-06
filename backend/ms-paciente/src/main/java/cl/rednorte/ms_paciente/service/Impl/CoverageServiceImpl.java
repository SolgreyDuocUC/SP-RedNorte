package cl.rednorte.ms_paciente.service.Impl;

import cl.rednorte.ms_paciente.dto.CoverageDTO;
import cl.rednorte.ms_paciente.exceptions.BusinessException;
import cl.rednorte.ms_paciente.model.CoverageEntity;
import cl.rednorte.ms_paciente.repository.CoverageRepository;
import cl.rednorte.ms_paciente.service.CoverageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoverageServiceImpl implements CoverageService {

    private final CoverageRepository repository;

    @Override
    public List<CoverageDTO> findAll() {

        return repository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CoverageDTO create(CoverageDTO dto) {

        if (dto.getType() == null || dto.getType().isBlank()) {
            throw new BusinessException("El tipo de cobertura es obligatorio");
        }

        CoverageEntity entity = CoverageEntity.builder()
                .id(UUID.randomUUID().toString())
                .type(dto.getType())
                .provider(dto.getProvider())
                .build();

        return toDto(repository.save(entity));
    }

    // Mapper interno
    private CoverageDTO toDto(CoverageEntity entity) {
        return CoverageDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .provider(entity.getProvider())
                .build();
    }
}
