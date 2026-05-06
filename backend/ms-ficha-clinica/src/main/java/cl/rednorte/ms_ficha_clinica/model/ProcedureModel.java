package cl.rednorte.ms_ficha_clinica.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcedureModel {

    private String id;
    private String patientId;
    private String encounterId;
    private String code;
    private String status;
    private Date performedDate;
    private String description;
}
