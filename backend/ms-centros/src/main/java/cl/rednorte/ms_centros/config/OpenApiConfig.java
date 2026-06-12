package cl.rednorte.ms_centros.config;

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
                        .title("RedNorte - Microservicio de Centros")
                        .description("API REST para la gestión de organizaciones y centros de atención (FHIR) del sistema RedNorte.")
                        .version("v1.0.0")
                        .contact(new Contact().name("Equipo RedNorte")));
    }
}
