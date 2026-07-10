package cl.rednorte.ms_notificaciones.controller;

import cl.rednorte.ms_notificaciones.dto.NotificationRequest;
import cl.rednorte.ms_notificaciones.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
class NotificationControllerTest {


    private MockMvc mockMvc;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private NotificationController notificationController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(notificationController)
                .addPlaceholderValue("app.cors.allowed-origins", "*")
                .build();
        objectMapper = new ObjectMapper();
        ReflectionTestUtils.setField(notificationController, "expectedSecret", "my-secret");
    }

    @Test
    void sendNotification_WithValidSecretAndRequest_ShouldReturnOk() throws Exception {
        NotificationRequest request = new NotificationRequest();
        request.setRecipient("test@test.com");
        request.setSubject("Test Subject");
        request.setBody("Test Body");

        doNothing().when(emailService).sendEmail(any(NotificationRequest.class));

        mockMvc.perform(post("/api/v1/notifications/send")
                .header("X-Notification-Secret", "my-secret")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("Notificación enviada con éxito."));

        verify(emailService, times(1)).sendEmail(any(NotificationRequest.class));
    }

    @Test
    void sendNotification_WithInvalidSecret_ShouldReturnUnauthorized() throws Exception {
        NotificationRequest request = new NotificationRequest();

        mockMvc.perform(post("/api/v1/notifications/send")
                .header("X-Notification-Secret", "wrong-secret")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("No autorizado."));

        verify(emailService, never()).sendEmail(any(NotificationRequest.class));
    }

    @Test
    void sendNotification_WithMissingRecipient_ShouldReturnBadRequest() throws Exception {
        NotificationRequest request = new NotificationRequest();
        request.setSubject("Test Subject");
        request.setBody("Test Body");

        mockMvc.perform(post("/api/v1/notifications/send")
                .header("X-Notification-Secret", "my-secret")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El destinatario es obligatorio."));

        verify(emailService, never()).sendEmail(any(NotificationRequest.class));
    }

    @Test
    void sendNotification_WhenEmailServiceFails_ShouldReturnInternalServerError() throws Exception {
        NotificationRequest request = new NotificationRequest();
        request.setRecipient("test@test.com");
        request.setSubject("Test Subject");
        request.setBody("Test Body");

        doThrow(new RuntimeException("SMTP error")).when(emailService).sendEmail(any(NotificationRequest.class));

        mockMvc.perform(post("/api/v1/notifications/send")
                .header("X-Notification-Secret", "my-secret")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error al enviar la notificación. Por favor intente más tarde."));

        verify(emailService, times(1)).sendEmail(any(NotificationRequest.class));
    }
}
