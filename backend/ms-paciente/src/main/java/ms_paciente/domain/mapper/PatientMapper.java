package ms_paciente.domain.mapper;

import ms_paciente.domain.PatientModel;
import ms_paciente.domain.IdentifierModel;
import org.hl7.fhir.r4.model.*;
import java.time.ZoneId;
import java.util.Date;
import java.util.stream.Collectors;

public class PatientMapper {

    private PatientMapper() {}

    public static Patient toFhir(PatientModel model) {
        if (model == null) return null;

        Patient patient = new Patient();
        if (model.getId() != null) {
            patient.setId(model.getId());
        }

        patient.setActive(model.isActive());

        // Names
        HumanName name = patient.addName();
        if (model.getFirstName() != null) name.addGiven(model.getFirstName());
        if (model.getLastName() != null) name.setFamily(model.getLastName());

        // Gender
        if (model.getGender() != null) {
            patient.setGender(Enumerations.AdministrativeGender.fromCode(model.getGender().name().toLowerCase()));
        }

        // Birthdate
        if (model.getBirthDate() != null) {
            patient.setBirthDate(Date.from(model.getBirthDate().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        }

        // Contact
        if (model.getPrimaryPhone() != null) {
            patient.addTelecom().setSystem(ContactPoint.ContactPointSystem.PHONE).setValue(model.getPrimaryPhone()).setUse(ContactPoint.ContactPointUse.HOME);
        }
        if (model.getEmail() != null) {
            patient.addTelecom().setSystem(ContactPoint.ContactPointSystem.EMAIL).setValue(model.getEmail());
        }

        // Address
        if (model.getAddress() != null) {
            patient.addAddress().setText(model.getAddress());
        }

        // Identifiers
        if (model.getIdentifiers() != null) {
            patient.setIdentifier(model.getIdentifiers().stream()
                .map(PatientMapper::toFhirIdentifier)
                .collect(Collectors.toList()));
        }

        return patient;
    }

    private static Identifier toFhirIdentifier(IdentifierModel model) {
        Identifier fhirId = new Identifier();
        if (model.getType() != null) {
            fhirId.getType().setText(model.getType().name());
        }
        fhirId.setValue(model.getValue());
        return fhirId;
    }

    public static PatientModel toModel(Patient fhir) {
        if (fhir == null) return null;

        PatientModel model = new PatientModel();
        model.setId(fhir.getIdElement().getIdPart());
        model.setActive(fhir.getActive());

        // Names
        if (fhir.hasName()) {
            HumanName name = fhir.getNameFirstRep();
            model.setFirstName(name.getGivenAsSingleString());
            model.setLastName(name.getFamily());
        }

        // Gender
        if (fhir.hasGender()) {
            try {
                model.setGender(ms_paciente.domain.types.Gender.valueOf(fhir.getGender().toCode().toUpperCase()));
            } catch (Exception e) {
                model.setGender(ms_paciente.domain.types.Gender.UNKNOWN);
            }
        }

        // Birthdate
        if (fhir.hasBirthDate()) {
            model.setBirthDate(fhir.getBirthDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        }

        // Contact / Address
        if (fhir.hasTelecom()) {
            fhir.getTelecom().stream()
                .filter(t -> t.getSystem() == ContactPoint.ContactPointSystem.PHONE)
                .findFirst()
                .ifPresent(t -> model.setPrimaryPhone(t.getValue()));
            
            fhir.getTelecom().stream()
                .filter(t -> t.getSystem() == ContactPoint.ContactPointSystem.EMAIL)
                .findFirst()
                .ifPresent(t -> model.setEmail(t.getValue()));
        }
        
        if (fhir.hasAddress()) {
            model.setAddress(fhir.getAddressFirstRep().getText());
        }

        // Identifiers
        if (fhir.hasIdentifier()) {
            model.setIdentifiers(fhir.getIdentifier().stream()
                .map(PatientMapper::toModelIdentifier)
                .collect(Collectors.toList()));
        }

        return model;
    }

    private static IdentifierModel toModelIdentifier(Identifier fhir) {
        IdentifierModel model = new IdentifierModel();
        model.setValue(fhir.getValue());
        if (fhir.hasType()) {
            try {
                model.setType(ms_paciente.domain.types.IdentifierType.valueOf(fhir.getType().getText().toUpperCase()));
            } catch (Exception e) {
                // Handle unknown type
            }
        }
        return model;
    }
}
