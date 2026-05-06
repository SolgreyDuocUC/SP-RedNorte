package cl.rednorte.ms_agenda_medica.dto;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private String id;
    private String patientId;
    private String practitionerId;
    private Date start;
    private Date end;
    private String status;
    private String description;
}
