package cl.rednorte.ms_usuarios.integration.loginuser;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

/**
 * RestClient apuntado a ms-login-user, con timeouts duros y Bearer
 * inter-MS por default. Resilience4j envuelve los métodos del cliente
 * (timeout suave, retry, circuit breaker).
 */
@Configuration
@RequiredArgsConstructor
public class LoginUserClientConfig {

    private final LoginUserClientProperties properties;

    @Bean
    public RestClient loginUserRestClient() {
        var factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout((int) properties.getConnectTimeout().toMillis());
        factory.setReadTimeout((int) properties.getReadTimeout().toMillis());

        RestClient.Builder builder = RestClient.builder()
                .baseUrl(properties.getBaseUrl())
                .requestFactory(factory);

        if (properties.getToken() != null && !properties.getToken().isBlank()) {
            builder.defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.getToken());
        }
        return builder.build();
    }
}
