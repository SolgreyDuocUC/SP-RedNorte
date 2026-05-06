package cl.rednorte.mspaciente.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import cl.rednorte.mspaciente.domain.types.IdentifierType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@cl.rednorte.mspaciente.validation.annotation.ValidIdentifier
public class IdentifierDTO {

    @NotNull(message = "El tipo de identificador es obligatorio")
    private IdentifierType type;

    @NotBlank(message = "El valor del identificador es obligatorio")
    private String value;

    private String country;
}
