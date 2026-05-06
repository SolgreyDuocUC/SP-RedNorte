package cl.rednorte.ms_paciente.dto;

import cl.rednorte.ms_paciente.model.status.Gender;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDTO {

    private String id;

    // RUN u otro identificador
    private String identifierType;
    private String identifierValue;

    private String firstName;
    private String lastName;

    private Gender gender;

    private String insurance;
}
