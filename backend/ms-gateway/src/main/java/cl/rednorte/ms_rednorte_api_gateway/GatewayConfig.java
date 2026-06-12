package cl.rednorte.ms_rednorte_api_gateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;
import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;

@Configuration
public class GatewayConfig {

        @Value("${services.ficha-clinica.url}")
        private String fichaClinicaUrl;

        @Value("${services.paciente.url}")
        private String pacienteUrl;

        @Value("${services.reservas.url}")
        private String reservasUrl;

        @Value("${services.usuarios.url}")
        private String usuariosUrl;

        @Value("${services.urgencias.url}")
        private String urgenciasUrl;

        @Value("${services.centros.url}")
        private String centrosUrl;

        @Value("${services.notificaciones.url}")
        private String notificacionesUrl;

        @Bean
        public RouterFunction<ServerResponse> customRoutes() {
                return route("ruta-ficha-clinica")
                                .route(path("/api/v1/encounters/**")
                                                .or(path("/api/v1/clinical-notes/**"))
                                                .or(path("/api/v1/procedures/**"))
                                                .or(path("/api/v1/conditions/**"))
                                                .or(path("/api/v1/history/**"))
                                                .or(path("/api/v1/observations/**")), http())
                                .before(uri(fichaClinicaUrl))
                                .build()
                                .and(route("ruta-paciente")
                                                .route(path("/api/v1/patients/**")
                                                                .or(path("/api/v1/coverages/**")), http())
                                                .before(uri(pacienteUrl))
                                                .build())
                                .and(route("ruta-reservas")
                                                .route(path("/api/v1/appointments/**")
                                                                .or(path("/api/v1/slots/**")), http())
                                                .before(uri(reservasUrl))
                                                .build())
                                .and(route("ruta-urgencias")
                                                .route(path("/urgencias/**"), http())
                                                .before(uri(urgenciasUrl))
                                                .build())
                                .and(route("ruta-centros")
                                                .route(path("/api/v1/organizations/**")
                                                                .or(path("/api/v1/locations/**")), http())
                                                .before(uri(centrosUrl))
                                                .build())
                                .and(route("ruta-notificaciones")
                                                .route(path("/api/v1/notifications/**"), http())
                                                .before(uri(notificacionesUrl))
                                                .build())
                                .and(route("ruta-usuarios")
                                                .route(path("/api/v1/auth/**")
                                                                .or(path("/api/v1/users/**"))
                                                                .or(path("/api/v1/roles/**"))
                                                                .or(path("/api/v2/practitioner/**")), http())
                                                .before(uri(usuariosUrl))
                                                .build());
        }
}
