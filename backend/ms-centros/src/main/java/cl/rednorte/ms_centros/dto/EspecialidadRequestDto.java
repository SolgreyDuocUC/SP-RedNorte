package cl.rednorte.ms_centros.dto;

import cl.rednorte.ms_centros.model.CentroEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EspecialidadDto {

    private Long idEspecialidad;

    private String nombreEspecialidad;

    private String descripcionEspecialidad;

    @ManyToMany(mappedBy = "especialidades")
    private Set<CentroEntity> centros = new HashSet<>();
    
}
