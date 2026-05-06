package cl.rednorte.mspaciente.mapper;

import cl.rednorte.mspaciente.domain.Entity.CoverageEntity;
import cl.rednorte.mspaciente.domain.Entity.IdentifierEntity;
import cl.rednorte.mspaciente.domain.Entity.PatientEntity;
import cl.rednorte.mspaciente.domain.types.Gender;
import cl.rednorte.mspaciente.dto.CoverageDTO;
import cl.rednorte.mspaciente.dto.IdentifierDTO;
import cl.rednorte.mspaciente.dto.PatientDTO;

import java.util.stream.Collectors;

public class PatientEntityMapper {

    public static PatientEntity toEntity(PatientDTO dto) {
        if (dto == null) return null;

        PatientEntity entity = PatientEntity.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .gender(parseGender(dto.getGender()))
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
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .gender(entity.getGender() != null ? entity.getGender().name() : null)
                .birthDate(entity.getBirthDate())
                .primaryPhone(entity.getPrimaryPhone())
                .secondaryPhone(entity.getSecondaryPhone())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .active(entity.isActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
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

    public static CoverageEntity toCoverageEntity(CoverageDTO dto, PatientEntity patient) {
        return CoverageEntity.builder()
                .id(dto.getId())
                .type(dto.getType())
                .provider(dto.getProvider())
                .plan(dto.getPlan())
                .status(dto.getStatus())
                .patient(patient)
                .build();
    }

    public static CoverageDTO toCoverageDTO(CoverageEntity entity) {
        if (entity == null) return null;
        return CoverageDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .provider(entity.getProvider())
                .plan(entity.getPlan())
                .status(entity.getStatus())
                .build();
    }

    private static Gender parseGender(String gender) {
        if (gender == null || gender.isBlank()) return Gender.UNKNOWN;
        try {
            return Gender.valueOf(gender.toUpperCase());
        } catch (IllegalArgumentException e) {
            return Gender.UNKNOWN;
        }
    }
}
