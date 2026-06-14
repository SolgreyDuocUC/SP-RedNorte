package cl.rednorte.ms_centros.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CentrosDto {

    private Long id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String status;
    private List<String> specialties;

    private ComunaResponseDto comuna;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ComunaResponseDto {
        private Long id;
        private String nombre;
    }
}