package cl.rednorte.ms_ficha_clinica.model.mapper;

import cl.rednorte.ms_ficha_clinica.dto.EncounterDTO;
import cl.rednorte.ms_ficha_clinica.model.EncounterEntity;
import cl.rednorte.ms_ficha_clinica.model.EncounterModel;
import cl.rednorte.ms_ficha_clinica.model.status.EncounterStatus;

import java.util.UUID;

public class EncounterMapper {

    public static EncounterModel toModel(EncounterDTO dto) {
        if (dto == null)
            return null;

        return EncounterModel.builder()
                .id(dto.getId() != null ? dto.getId() : UUID.randomUUID().toString())
                .patientId(dto.getPatientId())
                .locationId(dto.getLocationId())
                .status(parseStatus(dto.getStatus()))
                .periodStart(dto.getPeriodStart())
                .periodEnd(dto.getPeriodEnd())
                .practitioner(dto.getPractitioner())
                .build();
    }

    public static EncounterEntity toEntity(EncounterModel model) {
        if (model == null)
            return null;

        return EncounterEntity.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .locationId(model.getLocationId())
                .status(model.getStatus())
                .periodStart(model.getPeriodStart())
                .periodEnd(model.getPeriodEnd())
                .practitioner(model.getPractitioner())
                .build();
    }

    public static EncounterModel toModel(EncounterEntity entity) {
        if (entity == null)
            return null;

        return EncounterModel.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .locationId(entity.getLocationId())
                .status(entity.getStatus())
                .periodStart(entity.getPeriodStart())
                .periodEnd(entity.getPeriodEnd())
                .practitioner(entity.getPractitioner())
                .build();
    }

    public static EncounterDTO toDTO(EncounterModel model) {
        if (model == null)
            return null;

        return EncounterDTO.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .locationId(model.getLocationId())
                .status(model.getStatus().name())
                .periodStart(model.getPeriodStart())
                .periodEnd(model.getPeriodEnd())
                .practitioner(model.getPractitioner())
                .build();
    }

    private static EncounterStatus parseStatus(String status) {
        try {
            return EncounterStatus.valueOf(status.toUpperCase());
        } catch (Exception e) {
            return EncounterStatus.IN_PROGRESS;
        }
    }
}
