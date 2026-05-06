package cl.rednorte.ms_paciente.model.mapper;

import cl.rednorte.ms_paciente.dto.PatientDTO;
import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.model.status.Gender;
import org.springframework.stereotype.Component;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Enumerations.AdministrativeGender;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PatientMapper {

    private final CoverageMapper coverageMapper;

    public PatientEntity toEntity(PatientDTO dto) {

        if (dto == null)
            return null;

        PatientEntity entity = PatientEntity.builder()
                .id(dto.getId())
                .identifierType(dto.getIdentifierType())
                .identifierValue(dto.getIdentifierValue())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .gender(dto.getGender())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();

        if (dto.getCoverage() != null) {
            entity.setCoverage(coverageMapper.toEntity(dto.getCoverage()));
            entity.getCoverage().setPatient(entity);
        }

        return entity;
    }

    public PatientDTO toDto(PatientEntity entity) {

        if (entity == null)
            return null;

        return PatientDTO.builder()
                .id(entity.getId())
                .identifierType(entity.getIdentifierType())
                .identifierValue(entity.getIdentifierValue())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .gender(entity.getGender())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .active(entity.getActive())
                .coverage(coverageMapper.toDto(entity.getCoverage()))
                .build();
    }

    public Patient toFhir(PatientEntity entity) {
        if (entity == null)
            return null;

        Patient fhirPatient = new Patient();
        fhirPatient.setId(entity.getId());

        if (entity.getIdentifierType() != null && entity.getIdentifierValue() != null) {
            Identifier identifier = new Identifier();
            identifier.setSystem(entity.getIdentifierType());
            identifier.setValue(entity.getIdentifierValue());
            fhirPatient.addIdentifier(identifier);
        }

        HumanName name = new HumanName();
        if (entity.getFirstName() != null)
            name.addGiven(entity.getFirstName());
        if (entity.getLastName() != null)
            name.setFamily(entity.getLastName());
        fhirPatient.addName(name);

        if (entity.getGender() != null) {
            switch (entity.getGender()) {
                case MALE:
                    fhirPatient.setGender(AdministrativeGender.MALE);
                    break;
                case FEMALE:
                    fhirPatient.setGender(AdministrativeGender.FEMALE);
                    break;
                case OTHER:
                    fhirPatient.setGender(AdministrativeGender.OTHER);
                    break;
                case UNKNOWN:
                default:
                    fhirPatient.setGender(AdministrativeGender.UNKNOWN);
                    break;
            }
        }

        if (entity.getPhone() != null) {
            org.hl7.fhir.r4.model.ContactPoint phone = new org.hl7.fhir.r4.model.ContactPoint();
            phone.setSystem(org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem.PHONE);
            phone.setValue(entity.getPhone());
            fhirPatient.addTelecom(phone);
        }

        if (entity.getEmail() != null) {
            org.hl7.fhir.r4.model.ContactPoint email = new org.hl7.fhir.r4.model.ContactPoint();
            email.setSystem(org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem.EMAIL);
            email.setValue(entity.getEmail());
            fhirPatient.addTelecom(email);
        }

        if (entity.getAddress() != null) {
            org.hl7.fhir.r4.model.Address address = new org.hl7.fhir.r4.model.Address();
            address.setText(entity.getAddress());
            fhirPatient.addAddress(address);
        }

        if (entity.getActive() != null) {
            fhirPatient.setActive(entity.getActive());
        }

        return fhirPatient;
    }

    public PatientEntity fromFhir(Patient fhirPatient) {
        if (fhirPatient == null)
            return null;

        PatientEntity.PatientEntityBuilder builder = PatientEntity.builder();

        if (fhirPatient.hasIdElement() && fhirPatient.getIdElement().hasIdPart()) {
            builder.id(fhirPatient.getIdElement().getIdPart());
        }

        if (fhirPatient.hasIdentifier() && !fhirPatient.getIdentifier().isEmpty()) {
            Identifier id = fhirPatient.getIdentifier().get(0);
            builder.identifierType(id.getSystem() != null ? id.getSystem() : "RUN");
            builder.identifierValue(id.getValue());
        }

        if (fhirPatient.hasName() && !fhirPatient.getName().isEmpty()) {
            HumanName name = fhirPatient.getName().get(0);
            if (name.hasGiven()) {
                builder.firstName(name.getGiven().get(0).getValueNotNull());
            }
            if (name.hasFamily()) {
                builder.lastName(name.getFamily());
            }
        }

        if (fhirPatient.hasGender()) {
            switch (fhirPatient.getGender()) {
                case MALE:
                    builder.gender(Gender.MALE);
                    break;
                case FEMALE:
                    builder.gender(Gender.FEMALE);
                    break;
                case OTHER:
                    builder.gender(Gender.OTHER);
                    break;
                case UNKNOWN:
                case NULL:
                default:
                    builder.gender(Gender.UNKNOWN);
                    break;
            }
        }

        if (fhirPatient.hasTelecom()) {
            for (org.hl7.fhir.r4.model.ContactPoint cp : fhirPatient.getTelecom()) {
                if (cp.getSystem() == org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem.PHONE) {
                    builder.phone(cp.getValue());
                } else if (cp.getSystem() == org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem.EMAIL) {
                    builder.email(cp.getValue());
                }
            }
        }

        if (fhirPatient.hasAddress() && !fhirPatient.getAddress().isEmpty()) {
            builder.address(fhirPatient.getAddress().get(0).getText());
        }

        if (fhirPatient.hasActive()) {
            builder.active(fhirPatient.getActive());
        }

        return builder.build();
    }
}
