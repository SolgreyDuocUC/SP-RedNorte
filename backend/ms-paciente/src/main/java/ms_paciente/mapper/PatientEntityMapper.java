package ms_paciente.mapper;

import ms_paciente.domain.Entity.CoverageEntity;
import ms_paciente.domain.Entity.IdentifierEntity;
import ms_paciente.domain.Entity.PatientEntity;
import ms_paciente.domain.types.Gender;
import ms_paciente.dto.CoverageDTO;
import ms_paciente.dto.IdentifierDTO;
import ms_paciente.dto.PatientDTO;
import java.util.UUID;
import java.util.stream.Collectors;

public class PatientEntityMapper {

    public static PatientEntity toEntity(PatientDTO dto) {
        if (dto == null) return null;

        PatientEntity entity = PatientEntity.builder()
                .id(dto.getId() != null ? UUID.fromString(dto.getId()) : null)
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .gender(dto.getGender() != null ? Gender.valueOf(dto.getGender().toUpperCase()) : Gender.UNKNOWN)
                .birthDate(dto.getBirthDate())
                .primaryPhone(dto.getPrimaryPhone())
                .secondaryPhone(dto.getSecondaryPhone())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .active(dto.isActive())
                .build();

        if (dto.getIdentifiers() != null) {
            entity.setIdentifiers(dto.getIdentifiers().stream()
                    .map(idDto -> toIdentifierEntity(idDto, entity))
                    .collect(Collectors.toList()));
        }

        if (dto.getCoverages() != null) {
            entity.setCoverages(dto.getCoverages().stream()
                    .map(covDto -> toCoverageEntity(covDto, entity))
                    .collect(Collectors.toList()));
        }

        return entity;
    }

    public static PatientDTO toDTO(PatientEntity entity) {
        if (entity == null) return null;

        PatientDTO dto = PatientDTO.builder()
                .id(entity.getId() != null ? entity.getId().toString() : null)
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .gender(entity.getGender() != null ? entity.getGender().name() : null)
                .birthDate(entity.getBirthDate())
                .primaryPhone(entity.getPrimaryPhone())
                .secondaryPhone(entity.getSecondaryPhone())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .active(entity.isActive())
                .build();

        if (entity.getIdentifiers() != null) {
            dto.setIdentifiers(entity.getIdentifiers().stream()
                    .map(PatientEntityMapper::toIdentifierDTO)
                    .collect(Collectors.toList()));
        }

        if (entity.getCoverages() != null) {
            dto.setCoverages(entity.getCoverages().stream()
                    .map(PatientEntityMapper::toCoverageDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    private static IdentifierEntity toIdentifierEntity(IdentifierDTO dto, PatientEntity patient) {
        return IdentifierEntity.builder()
                .type(dto.getType())
                .value(dto.getValue())
                .country(dto.getCountry())
                .patient(patient)
                .build();
    }

    private static IdentifierDTO toIdentifierDTO(IdentifierEntity entity) {
        return IdentifierDTO.builder()
                .type(entity.getType())
                .value(entity.getValue())
                .country(entity.getCountry())
                .build();
    }

    public static CoverageEntity toEntity(CoverageDTO dto, PatientEntity patient) {
        return CoverageEntity.builder()
                .id(dto.getId() != null ? UUID.fromString(dto.getId()) : null)
                .type(dto.getType())
                .provider(dto.getProvider())
                .plan(dto.getPlan())
                .status(dto.getStatus())
                .patient(patient)
                .build();
    }

    public static CoverageDTO toDTO(CoverageEntity entity) {
        if (entity == null) return null;
        return CoverageDTO.builder()
                .id(entity.getId() != null ? entity.getId().toString() : null)
                .type(entity.getType())
                .provider(entity.getProvider())
                .plan(entity.getPlan())
                .status(entity.getStatus())
                .build();
    }
}
