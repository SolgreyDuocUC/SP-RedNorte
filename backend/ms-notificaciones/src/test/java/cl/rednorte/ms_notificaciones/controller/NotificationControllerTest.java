package cl.rednorte.ms_notificaciones.controller;

import cl.rednorte.ms_notificaciones.dto.NotificationRequest;
import cl.rednorte.ms_notificaciones.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NotificationController.class)
@TestPropertySource(properties = {
        "app.security.notification-secret=test-secret-ci",
        "spring.mail.username=test@example.com",
        "spring.mail.password=test-password"
})
class NotificationControllerTest {

    private static final String TEST_SECRET = "test-secret-ci";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void whenSecretMissing_shouldReturnUnauthorized() throws Exception {
        NotificationRequest request = NotificationRequest.builder()
                .recipient("test@test.com")
                .subject("Asunto")
                .body("Cuerpo")
                .build();

        mockMvc.perform(post("/api/v1/notifications/send")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void whenSecretMatchesAndValidRequest_shouldReturnSuccess() throws Exception {
        NotificationRequest request = NotificationRequest.builder()
                .recipient("test@test.com")
                .subject("Asunto")
                .body("Cuerpo")
                .build();

        doNothing().when(emailService).sendEmail(any(NotificationRequest.class));

        mockMvc.perform(post("/api/v1/notifications/send")
                .header("X-Notification-Secret", TEST_SECRET)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("Notificación enviada con éxito."));
    }

    @Test
    void whenMissingRecipient_shouldReturnBadRequest() throws Exception {
        NotificationRequest request = NotificationRequest.builder()
                .subject("Asunto")
                .body("Cuerpo")
                .build();

        mockMvc.perform(post("/api/v1/notifications/send")
                .header("X-Notification-Secret", TEST_SECRET)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El destinatario es obligatorio."));
    }
}
