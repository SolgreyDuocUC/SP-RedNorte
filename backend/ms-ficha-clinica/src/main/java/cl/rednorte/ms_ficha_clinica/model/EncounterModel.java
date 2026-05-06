package cl.rednorte.ms_ficha_clinica.model;

import cl.rednorte.ms_ficha_clinica.model.status.EncounterStatus;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EncounterModel {

    private String id;
    private String patientId;
    private String locationId;
    private EncounterStatus status;
    private Date periodStart;
    private Date periodEnd;
    private String practitioner;
}
