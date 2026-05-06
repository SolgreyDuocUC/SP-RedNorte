package cl.rednorte.ms_paciente.model.mapper;

import cl.rednorte.ms_paciente.dto.CoverageDTO;
import cl.rednorte.ms_paciente.model.CoverageEntity;
import org.springframework.stereotype.Component;
import org.hl7.fhir.r4.model.Coverage;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.CodeableConcept;

@Component
public class CoverageMapper {

    public CoverageEntity toEntity(CoverageDTO dto) {
        if (dto == null)
            return null;
        return CoverageEntity.builder()
                .id(dto.getId())
                .type(dto.getType())
                .provider(dto.getProvider())
                .build();
    }

    public CoverageDTO toDto(CoverageEntity entity) {
        if (entity == null)
            return null;
        return CoverageDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .provider(entity.getProvider())
                .build();
    }

    public Coverage toFhir(CoverageEntity entity) {
        if (entity == null)
            return null;

        Coverage coverage = new Coverage();
        coverage.setId(entity.getId());

        if (entity.getType() != null) {
            CodeableConcept typeConcept = new CodeableConcept();
            typeConcept.setText(entity.getType());
            coverage.setType(typeConcept);
        }

        if (entity.getProvider() != null) {
            coverage.getPayor().add(new Reference().setDisplay(entity.getProvider()));
        }

        if (entity.getPatient() != null) {
            coverage.setBeneficiary(new Reference("Patient/" + entity.getPatient().getId()));
        }

        return coverage;
    }

    public CoverageEntity fromFhir(Coverage fhirCoverage) {
        if (fhirCoverage == null)
            return null;

        CoverageEntity.CoverageEntityBuilder builder = CoverageEntity.builder();

        if (fhirCoverage.hasIdElement() && fhirCoverage.getIdElement().hasIdPart()) {
            builder.id(fhirCoverage.getIdElement().getIdPart());
        }

        if (fhirCoverage.hasType() && fhirCoverage.getType().hasText()) {
            builder.type(fhirCoverage.getType().getText());
        }

        if (fhirCoverage.hasPayor() && !fhirCoverage.getPayor().isEmpty()) {
            builder.provider(fhirCoverage.getPayor().get(0).getDisplay());
        }

        return builder.build();
    }
}
