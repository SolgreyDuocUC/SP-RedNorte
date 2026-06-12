package cl.rednorte.ms_notificaciones.controller;

import cl.rednorte.ms_notificaciones.dto.NotificationRequest;
import cl.rednorte.ms_notificaciones.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins}")
@Slf4j
public class NotificationController {

    private final EmailService emailService;

    @Value("${app.security.notification-secret}")
    private String expectedSecret;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(
            @RequestHeader(value = "X-Notification-Secret", required = false) String clientSecret,
            @RequestBody NotificationRequest request) {

        // Validar token de seguridad inter-servicio
        if (expectedSecret != null && !expectedSecret.isBlank() && !expectedSecret.equals(clientSecret)) {
            log.warn("Intento de acceso no autorizado al servicio de notificaciones.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado.");
        }

        if (request.getRecipient() == null || request.getRecipient().isBlank()) {
            return ResponseEntity.badRequest().body("El destinatario es obligatorio.");
        }
        if (request.getSubject() == null || request.getSubject().isBlank()) {
            return ResponseEntity.badRequest().body("El asunto es obligatorio.");
        }
        if (request.getBody() == null || request.getBody().isBlank()) {
            return ResponseEntity.badRequest().body("El cuerpo del mensaje es obligatorio.");
        }

        try {
            emailService.sendEmail(request);
            return ResponseEntity.ok("Notificación enviada con éxito.");
        } catch (Exception e) {
            log.error("Fallo al enviar notificación por correo a {}: {}", request.getRecipient(), e.getMessage(), e);
            // Retorna un mensaje sanitizado sin exponer detalles SMTP internos
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al enviar la notificación. Por favor intente más tarde.");
        }
    }
}
