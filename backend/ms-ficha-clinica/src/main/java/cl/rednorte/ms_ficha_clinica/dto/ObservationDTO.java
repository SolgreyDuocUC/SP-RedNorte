package cl.rednorte.ms_ficha_clinica.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ObservationDTO {
    private String id;
    private String patientId;
    private String encounterId;
    private String code;
    private Double value;
    private String unit;
    private Date effectiveDate;
}
