package cl.rednorte.ms_reservas.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    private static final String BEARER_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("RedNorte - Microservicio de Reservas")
                        .description("API REST para la gestión de la agenda médica: horarios disponibles y citas de pacientes. "
                                + "Reservar/ver/reagendar/cancelar una cita propia es público (autoatención); "
                                + "listar todo, la agenda de un profesional, la lista de espera y la gestión "
                                + "de bloques de agenda exigen JWT (ver SecurityConfig).")
                        .version("v1.0.0")
                        .contact(new Contact().name("Equipo RedNorte")))
                .addSecurityItem(new SecurityRequirement().addList(BEARER_SCHEME))
                .components(new Components().addSecuritySchemes(BEARER_SCHEME,
                        new SecurityScheme()
                                .name(BEARER_SCHEME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}
