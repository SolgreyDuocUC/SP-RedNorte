package cl.rednorte.mspaciente.domain;

import lombok.*;
import cl.rednorte.mspaciente.domain.types.Gender;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientModel {

    private String id;

    private List<IdentifierModel> identifiers;

    private String firstName;
    private String lastName;

    private Gender gender;
    private LocalDate birthDate;

    private String primaryPhone;
    private String secondaryPhone;

    private String email;
    private String address;

    private boolean active;
}
