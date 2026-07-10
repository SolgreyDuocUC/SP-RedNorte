package cl.rednorte.ms_reservas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Resource Server: exige un JWT válido (HS256, secreto compartido) en todo
 * /api/v1/** — antes este microservicio no tenía NINGUNA dependencia de
 * seguridad y cualquiera con acceso de red podía reservar, cancelar o
 * borrar citas y bloques de agenda sin autenticarse. Los tokens los emite
 * ms-usuarios (staff) o ms-paciente (pacientes); ambos firman con el mismo
 * secreto (application.security.jwt.secret-key) y llevan el claim
 * "authorities" como [{"authority": "ROLE_X"}, ...].
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${application.security.jwt.secret-key}")
    private String jwtSecretKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/actuator/**").permitAll()

                // El frontend permite reservar/ver/reagendar/cancelar una
                // cita SIN iniciar sesión (Reservahoraview y ReagendarView
                // son alcanzables desde HomePage antes del login — es un
                // flujo de autoatención real, no un descuido). Por eso estas
                // rutas quedan públicas; todo lo demás (listar TODAS las
                // citas/bloques, lista de espera, agenda completa de un
                // profesional, gestión de slots) es exclusivo de personal
                // autenticado. El orden importa: las reglas más específicas
                // van antes que el comodín de un solo segmento ({id}).
                .requestMatchers(HttpMethod.POST, "/api/v1/appointments").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/appointments/patient/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/appointments/practitioner/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/appointments/waitlist", "/api/v1/appointments/waitlist/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/appointments").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/appointments/*").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/v1/appointments/*").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/v1/appointments/*").permitAll()

                .requestMatchers(HttpMethod.GET, "/api/v1/slots/available").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/slots/practitioner/**").permitAll()
                .requestMatchers("/api/v1/slots/**").authenticated()

                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder())
                    .jwtAuthenticationConverter(jwtAuthenticationConverter()))
            );
        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKey = new SecretKeySpec(
                jwtSecretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        return NimbusJwtDecoder.withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    private Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(this::authoritiesFromClaim);
        return converter;
    }

    /**
     * Lee el claim "authorities" tal como lo emiten ms-usuarios/ms-paciente:
     * [{"authority": "ROLE_X"}, ...] (ya con prefijo ROLE_ incluido), y lo
     * convierte a GrantedAuthority sin agregar prefijo.
     */
    private Collection<GrantedAuthority> authoritiesFromClaim(Jwt jwt) {
        Object rawAuthorities = jwt.getClaims().get("authorities");
        if (!(rawAuthorities instanceof Collection<?> authorities)) {
            return List.of();
        }

        List<GrantedAuthority> granted = new ArrayList<>();
        for (Object authority : authorities) {
            if (authority instanceof Map<?, ?> map && map.get("authority") != null) {
                granted.add(new SimpleGrantedAuthority(map.get("authority").toString()));
            } else if (authority != null) {
                granted.add(new SimpleGrantedAuthority(authority.toString()));
            }
        }
        return granted;
    }
}
