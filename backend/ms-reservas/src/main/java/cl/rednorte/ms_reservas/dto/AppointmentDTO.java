package cl.rednorte.ms_reservas.dto;

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
    private String specialty;
    private Date start;
    private Date end;
    private String status;
    private String description;
    private Integer priority;
    private String slotId;
}
