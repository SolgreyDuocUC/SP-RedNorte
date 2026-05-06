package cl.rednorte.ms_paciente.model.mapper;

import cl.rednorte.ms_paciente.dto.PatientDTO;
import cl.rednorte.ms_paciente.model.PatientEntity;
import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public PatientEntity toEntity(PatientDTO dto) {

        if (dto == null) return null;

        return PatientEntity.builder()
                .id(dto.getId())
                .identifierType(dto.getIdentifierType())
                .identifierValue(dto.getIdentifierValue())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .gender(dto.getGender())
                .insurance(dto.getInsurance())
                .build();
    }

    public PatientDTO toDto(PatientEntity entity) {

        if (entity == null) return null;

        return PatientDTO.builder()
                .id(entity.getId())
                .identifierType(entity.getIdentifierType())
                .identifierValue(entity.getIdentifierValue())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .gender(entity.getGender())
                .insurance(entity.getInsurance())
                .build();
    }

    public PatientDTO toDto(Object o) {
        if (o == null) {
            return null;
        }
        return null;
    }
}
