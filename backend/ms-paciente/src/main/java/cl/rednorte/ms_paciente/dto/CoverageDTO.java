package cl.rednorte.ms_paciente.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverageDTO {

    private String id;

    private String type;      // FONASA, ISAPRE
    private String provider;  // Colmena, Consalud, etc.
}
