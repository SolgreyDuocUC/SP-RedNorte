package cl.rednorte.ms_ficha_clinica.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConditionDTO {

    private String patientId;
    private String encounterId;
    private String code;
    private String clinicalStatus;
    private String description;
}
