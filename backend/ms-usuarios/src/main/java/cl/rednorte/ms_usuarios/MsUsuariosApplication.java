package cl.rednorte.ms_usuarios;

import cl.rednorte.ms_usuarios.config.CorsProperties;
import cl.rednorte.ms_usuarios.integration.loginuser.LoginUserClientProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableConfigurationProperties({LoginUserClientProperties.class, CorsProperties.class})
@EnableFeignClients
public class MsUsuariosApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsUsuariosApplication.class, args);
    }
}
