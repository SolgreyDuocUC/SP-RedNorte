package cl.rednorte.ms_ficha_clinica.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("RedNorte - Microservicio de Ficha Clínica")
                        .description("API REST para la gestión del historial clínico: encuentros, notas, diagnósticos, procedimientos y observaciones.")
                        .version("v1.0.0")
                        .contact(new Contact().name("Equipo RedNorte")));
    }
}
