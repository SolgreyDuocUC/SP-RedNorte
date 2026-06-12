package cl.rednorte.ms_usuarios.config;

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
                        .title("RedNorte - Microservicio de Usuarios")
                        .description("API REST para la gestión de usuarios y roles del sistema RedNorte.")
                        .version("v1.0.0")
                        .contact(new Contact().name("Equipo RedNorte")));
    }
}
