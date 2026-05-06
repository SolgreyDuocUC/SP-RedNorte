package cl.rednorte.ms_paciente.service.Impl;

import cl.rednorte.ms_paciente.dto.PatientDTO;
import cl.rednorte.ms_paciente.exceptions.BusinessException;
import cl.rednorte.ms_paciente.exceptions.DuplicateResourceException;
import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.model.mapper.PatientMapper;
import cl.rednorte.ms_paciente.repository.PatientRepository;
import cl.rednorte.ms_paciente.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository repository;
    private final PatientMapper mapper;

    @Override
    public PatientDTO create(PatientDTO dto) {

        validateIdentifier(dto);

        repository.findByIdentifierTypeAndIdentifierValue(
                dto.getIdentifierType(),
                dto.getIdentifierValue()
        ).ifPresent(p -> {
            throw new DuplicateResourceException("El paciente ya existe con ese identificador");
        });

        PatientEntity entity = mapper.toEntity(dto);

        entity.setId(UUID.randomUUID().toString());
        entity.setCreatedAt(new Date());

        return mapper.toDto(repository.save(entity));
    }

    @Override
    public Optional<PatientDTO> findByIdentifier(String type, String value) {

        return repository.findByIdentifierTypeAndIdentifierValue(type, value)
                .map((java.util.function.Function<? super Object, ? extends PatientDTO>) mapper::toDto);
    }

    @Override
    public PatientDTO createOrUpdate(PatientDTO dto) {

        validateIdentifier(dto);

        // Caso 1: ya existe con ese tipo + valor
        Optional<Object> existing = Optional.ofNullable(repository
                .findByIdentifierTypeAndIdentifierValue(
                        dto.getIdentifierType(),
                        dto.getIdentifierValue()
                ));

        if (existing.isPresent()) {
            return mapper.toDto((PatientEntity) existing.get());
        }

        // Caso 2: existe con otro tipo (ej: PASSPORT → RUN)
        Optional<PatientEntity> byValue =
                repository.findByIdentifierValue(dto.getIdentifierValue());

        if (byValue.isPresent()) {
            PatientEntity entity = byValue.get();

            entity.setIdentifierType(dto.getIdentifierType());
            entity.setIdentifierValue(dto.getIdentifierValue());

            return mapper.toDto(repository.save(entity));
        }

        // Caso 3: no existe → crear
        return create(dto);
    }

    // 🔒 Validación interna
    private void validateIdentifier(PatientDTO dto) {

        if (dto.getIdentifierType() == null || dto.getIdentifierValue() == null) {
            throw new BusinessException("El tipo y valor del identificador son obligatorios");
        }

        if (dto.getIdentifierValue().isBlank()) {
            throw new BusinessException("El valor del identificador no puede estar vacío");
        }
    }
}