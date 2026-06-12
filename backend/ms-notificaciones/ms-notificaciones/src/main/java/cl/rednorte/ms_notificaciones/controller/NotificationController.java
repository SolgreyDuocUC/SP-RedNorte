package cl.rednorte.ms_notificaciones.controller;

import cl.rednorte.ms_notificaciones.dto.NotificationRequest;
import cl.rednorte.ms_notificaciones.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
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
            return ResponseEntity.internalServerError().body("Error al enviar la notificación: " + e.getMessage());
        }
    }
}
