package cl.rednorte.ms_centros.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EspecialidadResponseDto {

    private Long idEspecialidad;
    private String nombreEspecialidad;
    private String descripcionEspecialidad;

}