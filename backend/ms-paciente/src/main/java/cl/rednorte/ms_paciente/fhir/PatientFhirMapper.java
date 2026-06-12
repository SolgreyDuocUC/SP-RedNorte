package cl.rednorte.ms_paciente.fhir;

import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.model.status.Gender;
import org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem;
import org.hl7.fhir.r4.model.Enumerations.AdministrativeGender;
import org.springframework.stereotype.Component;

import java.util.Locale;

/**
 * Convierte {@link PatientEntity} (modelo interno) a
 * {@link org.hl7.fhir.r4.model.Patient} (FHIR R4). El identifier system se
 * elige según el tipo del identificador interno (RUN, PASSPORT, etc.).
 */
@Component
public class PatientFhirMapper {

    public static final String SYS_RUN = "http://rednorte.cl/fhir/identifier/run";
    public static final String SYS_PASSPORT = "http://rednorte.cl/fhir/identifier/passport";
    public static final String SYS_OTHER = "http://rednorte.cl/fhir/identifier/other";

    public org.hl7.fhir.r4.model.Patient toFhir(PatientEntity src) {
        org.hl7.fhir.r4.model.Patient out = new org.hl7.fhir.r4.model.Patient();
        out.setId(src.getId());

        if (src.getIdentifierValue() != null) {
            out.addIdentifier()
                    .setSystem(systemFor(src.getIdentifierType()))
                    .setValue(src.getIdentifierValue());
        }

        if (src.getFirstName() != null || src.getLastName() != null) {
            out.addName()
                    .addGiven(src.getFirstName())
                    .setFamily(src.getLastName());
        }

        out.setGender(mapGender(src.getGender()));

        if (src.getPhone() != null && !src.getPhone().isBlank()) {
            out.addTelecom()
                    .setSystem(ContactPointSystem.PHONE)
                    .setValue(src.getPhone());
        }
        if (src.getEmail() != null && !src.getEmail().isBlank()) {
            out.addTelecom()
                    .setSystem(ContactPointSystem.EMAIL)
                    .setValue(src.getEmail());
        }

        if (src.getAddress() != null && !src.getAddress().isBlank()) {
            // El modelo interno guarda dirección plana; en FHIR la enviamos en `text`.
            out.addAddress().setText(src.getAddress());
        }

        if (src.getActive() != null) {
            out.setActive(src.getActive());
        }
        return out;
    }

    private String systemFor(String identifierType) {
        if (identifierType == null) return SYS_OTHER;
        return switch (identifierType.toUpperCase(Locale.ROOT)) {
            case "RUN" -> SYS_RUN;
            case "PASSPORT" -> SYS_PASSPORT;
            default -> SYS_OTHER;
        };
    }

    private AdministrativeGender mapGender(Gender g) {
        if (g == null) return AdministrativeGender.UNKNOWN;
        return switch (g) {
            case MALE -> AdministrativeGender.MALE;
            case FEMALE -> AdministrativeGender.FEMALE;
            case OTHER -> AdministrativeGender.OTHER;
            case UNKNOWN -> AdministrativeGender.UNKNOWN;
        };
    }
}
