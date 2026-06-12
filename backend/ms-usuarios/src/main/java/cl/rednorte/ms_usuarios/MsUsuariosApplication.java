package cl.rednorte.ms_usuarios;

import cl.rednorte.ms_usuarios.config.CorsProperties;
import cl.rednorte.ms_usuarios.integration.loginuser.LoginUserClientProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({LoginUserClientProperties.class, CorsProperties.class})
public class MsUsuariosApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsUsuariosApplication.class, args);
    }
}
