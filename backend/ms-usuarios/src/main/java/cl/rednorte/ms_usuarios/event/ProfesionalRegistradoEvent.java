package cl.rednorte.ms_usuarios.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalRegistradoEvent {
    private String practitionerId;
    private String run;
    private String fullName;
    private String specialty;
    private LocalDateTime timestamp;
}
