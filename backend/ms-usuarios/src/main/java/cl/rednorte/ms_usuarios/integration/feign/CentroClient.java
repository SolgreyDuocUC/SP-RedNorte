package cl.rednorte.ms_usuarios.integration.feign;

import cl.rednorte.ms_usuarios.dto.feign.CentroFeignDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-centros", url = "${feign.client.config.ms-centros.url:http://localhost:8006}")
public interface CentroClient {

    @GetMapping("/api/v1/locations/{id}")
    CentroFeignDto obtenerCentroPorId(@PathVariable("id") Long id);
}
