package cl.rednorte.ms_urgencias.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                .requestMatchers("/urgencias/ingreso").hasRole("RECEPCIONISTA")
                .requestMatchers("/urgencias/triage/**").hasRole("ENFERMERO")
                .requestMatchers("/urgencias/ficha/**", "/urgencias/alta/**").hasRole("MEDICO")
                .requestMatchers("/urgencias/espera/**", "/urgencias/rechazo").permitAll() // Acceso público para la App del paciente
                .anyRequest().authenticated()
            );
        return http.build();
    }
}