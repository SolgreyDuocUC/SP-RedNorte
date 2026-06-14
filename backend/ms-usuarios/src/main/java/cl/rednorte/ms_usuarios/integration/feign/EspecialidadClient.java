package cl.rednorte.ms_usuarios.integration.feign;

import cl.rednorte.ms_usuarios.dto.feign.EspecialidadFeignDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-especialidades", url = "${feign.client.config.ms-centros.url:http://localhost:8001}")
public interface EspecialidadClient {

    @GetMapping("/api/v1/specialties/{id}")
    EspecialidadFeignDto obtenerEspecialidadPorId(@PathVariable("id") Long id);
}
