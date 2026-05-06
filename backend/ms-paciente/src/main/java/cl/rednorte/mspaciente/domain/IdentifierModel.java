package cl.rednorte.mspaciente.domain;

import lombok.*;
import cl.rednorte.mspaciente.domain.types.IdentifierType;

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
