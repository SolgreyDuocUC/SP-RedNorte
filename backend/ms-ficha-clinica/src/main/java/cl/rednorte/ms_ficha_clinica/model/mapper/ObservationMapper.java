package cl.rednorte.ms_ficha_clinica.model.mapper;

import cl.rednorte.ms_ficha_clinica.model.ObservationEntity;
import org.hl7.fhir.r4.model.*;

/*
Esta clase hace un mapeo por medio de org.hl7.fhir.r4.model.* desde HFIR
ayudando al cumplimiento del standar HL7 HFIR

Corrobora que la Entidad esté alineada con el estandar

Esto sirve para poder realizar interconsultas efectivas
*/

public class ObservationMapper {

    public static ObservationEntity fromFhir(Observation obs) {

        ObservationEntity entity = new ObservationEntity();

        entity.setId(obs.getId());

        if (obs.hasSubject()) {
            entity.setPatientId(
                    obs.getSubject().getReference().replace("Patient/", "")
            );
        }

        if (obs.hasEncounter()) {
            entity.setEncounterId(
                    obs.getEncounter().getReference().replace("Encounter/", "")
            );
        }

        if (obs.getCode().hasCoding()) {
            entity.setCode(obs.getCode().getCodingFirstRep().getCode());
        }

        if (obs.getValue() instanceof Quantity q) {
            entity.setValue(q.getValue().doubleValue());
            entity.setUnit(q.getUnit());
        }

        if (obs.hasEffectiveDateTimeType()) {
            entity.setEffectiveDate(obs.getEffectiveDateTimeType().getValue());
        }

        return entity;
    }
}