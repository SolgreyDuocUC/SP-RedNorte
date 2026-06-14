package cl.rednorte.ms_centros.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EspecialidadRequestDto {

    @NotBlank(message = "El nombre de la especialidad es obligatorio y no puede estar vacío.")
    @Size(max = 100, message = "El nombre de la especialidad no puede superar los 100 caracteres.")
    private String nombreEspecialidad;

    @NotBlank(message = "La descripción de la especialidad es obligatoria.")
    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres.")
    private String descripcionEspecialidad;
}