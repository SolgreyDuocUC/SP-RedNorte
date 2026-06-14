package cl.rednorte.ms_usuarios.dto.feign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CentroFeignDto {
    private Long id;
    private String name;
    private String address;
    private String status;
}
