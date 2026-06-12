package cl.rednorte.ms_usuarios.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Placeholder de seed de dev. Hoy no siembra nada porque:
 * - Users/Roles viven en ms-login-user.
 * - Patient vive en ms-paciente.
 * - Practitioner aún no tiene endpoint FHIR ni datos demo necesarios.
 *
 * Se mantiene como punto de extensión cuando aparezca un caso de uso
 * (ej. seed de Practitioner demo para validar el endpoint FHIR de
 * Practitioner cuando se reintroduzca).
 */
@Slf4j
@Profile("dev")
@Component
public class DevDataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) {
        log.debug("DevDataInitializer activo (perfil dev) sin seeds que ejecutar.");
    }
}
