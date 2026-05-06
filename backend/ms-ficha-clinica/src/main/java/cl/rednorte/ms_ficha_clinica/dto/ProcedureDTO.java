package cl.rednorte.ms_ficha_clinica.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcedureDTO {
    private String id;
    private String patientId;
    private String encounterId;
    private String code;
    private String status;
    private Date performedDate;
    private String description;
}
