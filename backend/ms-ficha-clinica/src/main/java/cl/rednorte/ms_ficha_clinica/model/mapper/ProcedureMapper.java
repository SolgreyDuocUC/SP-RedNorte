package cl.rednorte.ms_ficha_clinica.model.mapper;

import cl.rednorte.ms_ficha_clinica.dto.ProcedureDTO;
import cl.rednorte.ms_ficha_clinica.model.ProcedureEntity;
import cl.rednorte.ms_ficha_clinica.model.ProcedureModel;

import java.util.UUID;

public class ProcedureMapper {

    public static ProcedureModel toModel(ProcedureDTO dto) {
        if (dto == null)
            return null;

        return ProcedureModel.builder()
                .id(dto.getId() != null ? dto.getId() : UUID.randomUUID().toString())
                .patientId(dto.getPatientId())
                .encounterId(dto.getEncounterId())
                .code(dto.getCode())
                .status(dto.getStatus())
                .performedDate(dto.getPerformedDate())
                .description(dto.getDescription())
                .build();
    }

    public static ProcedureEntity toEntity(ProcedureModel model) {
        if (model == null)
            return null;

        return ProcedureEntity.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .encounterId(model.getEncounterId())
                .code(model.getCode())
                .status(model.getStatus())
                .performedDate(model.getPerformedDate())
                .description(model.getDescription())
                .build();
    }

    public static ProcedureModel toModel(ProcedureEntity entity) {
        if (entity == null)
            return null;

        return ProcedureModel.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .encounterId(entity.getEncounterId())
                .code(entity.getCode())
                .status(entity.getStatus())
                .performedDate(entity.getPerformedDate())
                .description(entity.getDescription())
                .build();
    }

    public static ProcedureDTO toDTO(ProcedureModel model) {
        if (model == null)
            return null;

        return ProcedureDTO.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .encounterId(model.getEncounterId())
                .code(model.getCode())
                .status(model.getStatus())
                .performedDate(model.getPerformedDate())
                .description(model.getDescription())
                .build();
    }
}
