package cl.rednorte.ms_ficha_clinica.model;
import lombok.*;

import java.util.Date;

/*
Esta clase sirve como modelo interno que va a conectarse con
el modelo de datos de HFIR, luego este se debe mapear con el SP
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ObservationModel {

    private String id;
    private String patientId;
    private String encounterId;
    private String code;
    private Double value;
    private String unit;
    private Date effectiveDate;

}
