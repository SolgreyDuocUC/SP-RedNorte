package cl.rednorte.ms_paciente.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * ms-paciente como Resource Server FHIR. Protege los endpoints FHIR
 * /Patient/** y los internos /internal/**; el CRUD legado
 * /api/v1/patients/** queda libre por decisión temporal (no romper
 * consumidores que aún no envían Bearer) — aunque sus endpoints con
 * @PreAuthorize (p.ej. PATCH .../contact) igual exigen un JWT válido.
 *
 * Los tokens los emite ms-usuarios (HS256, secreto compartido vía
 * application.security.jwt.secret-key, mismo valor que JWT_SECRET_KEY en
 * ms-usuarios). Los roles llegan en el claim "authorities" como objetos
 * {"authority": "ROLE_X"} ya con prefijo ROLE_, y se mapean directo a
 * GrantedAuthority para usar con hasRole()/hasAnyRole() en @PreAuthorize.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
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
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder())
                    .jwtAuthenticationConverter(jwtAuthenticationConverter()))
            )
            .headers(h -> h
                .frameOptions(f -> f.sameOrigin())
                .referrerPolicy(r -> r.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.NO_REFERRER))
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
     * Lee el claim "authorities" emitido por ms-usuarios, con forma
     * [{"authority": "ROLE_X"}, ...], y lo convierte a GrantedAuthority
     * sin agregar prefijo (ya viene incluido).
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

    @Bean
    public CorsFilter corsFilter(CorsProperties corsProperties) {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(corsProperties.isAllowCredentials());
        config.setAllowedOrigins(corsProperties.getAllowedOrigins());
        config.setAllowedMethods(corsProperties.getAllowedMethods());
        config.setAllowedHeaders(corsProperties.getAllowedHeaders());
        config.setMaxAge(corsProperties.getMaxAgeSeconds());
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
