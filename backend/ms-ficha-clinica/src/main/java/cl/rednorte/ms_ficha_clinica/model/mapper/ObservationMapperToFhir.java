package cl.rednorte.ms_ficha_clinica.model.mapper;

import cl.rednorte.ms_ficha_clinica.model.ObservationEntity;
import org.hl7.fhir.r4.model.*;

public class ObservationMapperToFhir {

    public static Observation toFhir(ObservationEntity entity) {

        Observation obs = new Observation();

        obs.setId(entity.getId());

        // 🔥 obligatorio en FHIR
        obs.setStatus(Observation.ObservationStatus.FINAL);

        // Patient
        obs.setSubject(new Reference("Patient/" + entity.getPatientId()));

        // Encounter
        obs.setEncounter(new Reference("Encounter/" + entity.getEncounterId()));

        // Código clínico
        obs.getCode().addCoding()
                .setSystem("http://loinc.org")
                .setCode(entity.getCode())
                .setDisplay("Clinical Observation"); // idealmente dinámico

        // Valor
        if (entity.getValue() != null) {
            obs.setValue(
                    new Quantity()
                            .setValue(entity.getValue())
                            .setUnit(entity.getUnit())
            );
        }

        // Fecha
        if (entity.getEffectiveDate() != null) {
            obs.setEffective(new DateTimeType(entity.getEffectiveDate()));
        }

        return obs;
    }
}