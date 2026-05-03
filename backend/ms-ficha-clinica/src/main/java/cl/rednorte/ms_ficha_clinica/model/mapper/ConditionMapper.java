package cl.rednorte.ms_ficha_clinica.model.mapper;

import cl.rednorte.ms_ficha_clinica.dto.ConditionDTO;
import cl.rednorte.ms_ficha_clinica.model.ConditionModel;
import cl.rednorte.ms_ficha_clinica.model.ConditionEntity;
import cl.rednorte.ms_ficha_clinica.model.status.ClinicalStatus;

import java.util.Date;
import java.util.UUID;

public class ConditionMapper {

    // DTO → MODEL
    public static ConditionModel toModel(ConditionDTO dto) {
        if (dto == null)
            return null;

        return ConditionModel.builder()
                .id(UUID.randomUUID().toString())
                .patientId(dto.getPatientId())
                .encounterId(dto.getEncounterId())
                .code(dto.getCode())
                .clinicalStatus(dto.getClinicalStatus())
                .description(dto.getDescription())
                .onsetDate(new Date()) // puedes ajustar si viene desde DTO
                .recordedDate(new Date())
                .build();
    }

    // MODEL → ENTITY
    public static ConditionEntity toEntity(ConditionModel model) {
        if (model == null)
            return null;

        return ConditionEntity.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .encounterId(model.getEncounterId())
                .code(model.getCode())
                .clinicalStatus(parseClinicalStatus(model.getClinicalStatus()))
                .description(model.getDescription())
                .onsetDate(model.getOnsetDate())
                .recordedDate(model.getRecordedDate())
                .build();
    }

    // ENTITY → MODEL
    public static ConditionModel toModel(ConditionEntity entity) {
        if (entity == null)
            return null;

        return ConditionModel.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .encounterId(entity.getEncounterId())
                .code(entity.getCode())
                .clinicalStatus(entity.getClinicalStatus() != null ? entity.getClinicalStatus().name() : null)
                .description(entity.getDescription())
                .onsetDate(entity.getOnsetDate())
                .recordedDate(entity.getRecordedDate())
                .build();
    }

    // MODEL → DTO (respuesta al frontend)
    public static ConditionDTO toDTO(ConditionModel model) {
        if (model == null)
            return null;

        return ConditionDTO.builder()
                .patientId(model.getPatientId())
                .encounterId(model.getEncounterId())
                .code(model.getCode())
                .clinicalStatus(model.getClinicalStatus())
                .description(model.getDescription())
                .build();
    }

    // Helper para evitar errores con strings
    private static ClinicalStatus parseClinicalStatus(String status) {
        try {
            return ClinicalStatus.valueOf(status.toUpperCase());
        } catch (Exception e) {
            return ClinicalStatus.ACTIVE; // valor por defecto seguro
        }
    }
}
