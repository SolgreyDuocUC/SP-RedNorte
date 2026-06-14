package cl.rednorte.ms_centros.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComunaDto {
    private Long id;
    private String nombre;
    private Long idRegion;
}
