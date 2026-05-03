package cl.rednorte.ms_ficha_clinica.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConditionModel {

    private String id;

    private String patientId;

    private String encounterId;

    private String code;
    // Código CIE-10 (ej: I10 Hipertensión)

    private String clinicalStatus;
    // active, resolved, inactive

    private String verificationStatus;
    // confirmed, unconfirmed (opcional pero PRO)

    private String description;
    // Texto libre del diagnóstico

    private Date onsetDate;
    // Fecha de inicio

    private Date recordedDate;
    // Fecha en que se registró
}