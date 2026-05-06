package cl.rednorte.ms_ficha_clinica.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EncounterDTO {
    private String id;
    private String patientId;
    private String locationId;
    private String status;
    private Date periodStart;
    private Date periodEnd;
    private String practitioner;
}
