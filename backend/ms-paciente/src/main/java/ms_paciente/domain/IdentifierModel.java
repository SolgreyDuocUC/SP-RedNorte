package ms_paciente.domain;

import lombok.*;
import ms_paciente.domain.types.IdentifierType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdentifierModel {

    private IdentifierType type; // ENUM → evita errores de string
    private String value;
    private String country;
}
