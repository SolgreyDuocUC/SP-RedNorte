package ms_paciente.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverageDTO {

    private String id;

    @NotBlank(message = "El tipo de cobertura es obligatorio")
    private String type;

    @NotBlank(message = "El proveedor de salud es obligatorio")
    private String provider;

    private String plan;
    private String status;
}
