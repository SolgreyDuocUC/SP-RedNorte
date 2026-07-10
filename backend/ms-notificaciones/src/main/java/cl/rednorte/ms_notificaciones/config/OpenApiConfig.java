package cl.rednorte.ms_notificaciones.config;

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

    private static final String NOTIFICATION_SECRET_SCHEME = "notificationSecret";

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("RedNorte - Microservicio de Notificaciones")
                        .description("API REST para el envío asíncrono de notificaciones por correo (SMTP Relay). "
                                + "Protegido perimetralmente mediante la cabecera X-Notification-Secret.")
                        .version("v1.0.0")
                        .contact(new Contact().name("Equipo RedNorte")))
                .addSecurityItem(new SecurityRequirement().addList(NOTIFICATION_SECRET_SCHEME))
                .components(new Components().addSecuritySchemes(NOTIFICATION_SECRET_SCHEME,
                        new SecurityScheme()
                                .name("X-Notification-Secret")
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .description("Secreto compartido inter-servicio (app.security.notification-secret).")));
    }
}
