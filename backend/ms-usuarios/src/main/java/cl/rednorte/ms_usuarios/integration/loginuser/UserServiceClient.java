package cl.rednorte.ms_usuarios.integration.loginuser;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.Optional;

/**
 * Cliente HTTP hacia {@code GET /internal/users/by-username/{u}} en
 * ms-login-user. Envuelto con Resilience4j: timeout vía RestClient,
 * retry exponencial y circuit breaker (config en application.yaml).
 *
 * 404 se traduce a {@link Optional#empty()}; cualquier otro 4xx/5xx
 * burbujea como RuntimeException para que el caller decida.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class UserServiceClient {

    public static final String CB_NAME = "loginUser";

    private final RestClient loginUserRestClient;

    @CircuitBreaker(name = CB_NAME)
    @Retry(name = CB_NAME)
    public Optional<UserAuthDTO> findByUsername(String username) {
        try {
            UserAuthDTO dto = loginUserRestClient.get()
                    .uri("/internal/users/by-username/{u}", username)
                    .retrieve()
                    .body(UserAuthDTO.class);
            return Optional.ofNullable(dto);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().equals(HttpStatusCode.valueOf(404))) {
                return Optional.empty();
            }
            log.warn("ms-login-user respondió error consultando {}: {}", username, e.getStatusCode());
            throw e;
        }
    }
}
