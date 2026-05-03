package cl.rednorte.ms_ficha_clinica.model.mapper;

import cl.rednorte.ms_ficha_clinica.dto.ClinicalNoteDTO;
import cl.rednorte.ms_ficha_clinica.model.ClinicalNoteEntity;
import cl.rednorte.ms_ficha_clinica.model.ClinicalNoteModel;

import java.util.UUID;

public class ClinicalNoteMapper {

    public static ClinicalNoteModel toModel(ClinicalNoteDTO dto) {
        if (dto == null)
            return null;

        return ClinicalNoteModel.builder()
                .id(dto.getId() != null ? dto.getId() : UUID.randomUUID().toString())
                .patientId(dto.getPatientId())
                .encounterId(dto.getEncounterId())
                .content(dto.getContent())
                .author(dto.getAuthor())
                .createdAt(dto.getCreatedAt())
                .build();
    }

    public static ClinicalNoteEntity toEntity(ClinicalNoteModel model) {
        if (model == null)
            return null;

        return ClinicalNoteEntity.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .encounterId(model.getEncounterId())
                .content(model.getContent())
                .author(model.getAuthor())
                .createdAt(model.getCreatedAt())
                .build();
    }

    public static ClinicalNoteModel toModel(ClinicalNoteEntity entity) {
        if (entity == null)
            return null;

        return ClinicalNoteModel.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .encounterId(entity.getEncounterId())
                .content(entity.getContent())
                .author(entity.getAuthor())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public static ClinicalNoteDTO toDTO(ClinicalNoteModel model) {
        if (model == null)
            return null;

        return ClinicalNoteDTO.builder()
                .id(model.getId())
                .patientId(model.getPatientId())
                .encounterId(model.getEncounterId())
                .content(model.getContent())
                .author(model.getAuthor())
                .createdAt(model.getCreatedAt())
                .build();
    }
}
