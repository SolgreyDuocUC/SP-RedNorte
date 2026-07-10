package cl.rednorte.ms_reservas.service.Impl;

import cl.rednorte.ms_reservas.dto.NotificationRequest;
import cl.rednorte.ms_reservas.dto.PatientIntegrationDTO;
import cl.rednorte.ms_reservas.model.AppointmentEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/**
 * Envía el correo de confirmación de una cita reservada. Se extrajo de
 * AppointmentServiceImpl a una clase propia para que también pueda
 * invocarse desde ReassignmentServiceImpl: antes, una promoción automática
 * de la lista de espera guardaba la cita directamente en el repositorio sin
 * pasar por AppointmentServiceImpl.update(), que era el único lugar que
 * disparaba el correo — el paciente promovido nunca era notificado.
 */
@Component
@Slf4j
public class AppointmentNotifier {

    @Value("${services.paciente.url}")
    private String pacienteUrl;

    @Value("${services.notificaciones.url}")
    private String notificacionesUrl;

    @Value("${app.security.notification-secret:}")
    private String notificationSecret;

    public void notifyBooked(AppointmentEntity entity) {
        try {
            RestClient restClient = RestClient.create();
            // ms-paciente exige un JWT válido en GET /api/v1/patients/{id}.
            // Se relaya el mismo token de la petición entrante (quien creó,
            // actualizó o canceló la cita ya está autenticado en este hilo)
            // porque, sin esto, ms-paciente respondía 401, la excepción caía
            // en el catch de abajo y el correo de confirmación NUNCA se
            // enviaba — en ningún caso, desde que se agregó el chequeo de
            // seguridad en ms-paciente.
            String bearerToken = currentBearerToken();
            RestClient.RequestHeadersSpec<?> patientRequest = restClient.get()
                    .uri(pacienteUrl + "/api/v1/patients/" + entity.getPatientId());
            if (bearerToken != null) {
                patientRequest = patientRequest.header("Authorization", "Bearer " + bearerToken);
            }
            PatientIntegrationDTO patient = patientRequest
                    .retrieve()
                    .body(PatientIntegrationDTO.class);

            if (patient == null || patient.getEmail() == null || patient.getEmail().isBlank()) {
                log.warn("No se pudo obtener el correo electrónico del paciente con ID: {}", entity.getPatientId());
                return;
            }

            String subject = "Confirmación de Cita Médica - RedNorte";
            String startStr = entity.getStart() != null ? entity.getStart().toString() : "No especificado";
            // Los datos del paciente/cita se escapan antes de interpolarlos:
            // este cuerpo se envía como HTML, y un nombre/especialidad con
            // caracteres HTML sin escapar permitiría inyectar marcado
            // arbitrario en un correo enviado desde la identidad SMTP real
            // de RedNorte (phishing, tracking, etc.).
            String htmlBody = String.format(
                    "<h3>Hola %s %s,</h3>" +
                    "<p>Tu cita médica ha sido agendada con éxito.</p>" +
                    "<ul>" +
                    "<li><strong>Especialidad:</strong> %s</li>" +
                    "<li><strong>Fecha/Hora de Inicio:</strong> %s</li>" +
                    "<li><strong>Código de Reserva:</strong> %s</li>" +
                    "</ul>" +
                    "<p>Guarda tu Código de Reserva: lo necesitarás si deseas cancelar tu hora.</p>" +
                    "<p>Gracias por atenderte en la Red de Salud RedNorte.</p>",
                    escapeHtml(patient.getFirstName()), escapeHtml(patient.getLastName()),
                    escapeHtml(entity.getSpecialty()), escapeHtml(startStr), escapeHtml(entity.getId())
            );

            NotificationRequest notification = NotificationRequest.builder()
                    .recipient(patient.getEmail())
                    .subject(subject)
                    .body(htmlBody)
                    .build();

            restClient.post()
                    .uri(notificacionesUrl + "/api/v1/notifications/send")
                    .header("X-Notification-Secret", notificationSecret)
                    .body(notification)
                    .retrieve()
                    .toBodilessEntity();

            log.info("Notificación de cita enviada correctamente a: {}", patient.getEmail());
        } catch (Exception e) {
            log.error("Error al enviar la notificación por correo para la cita {}: {}", entity.getId(), e.getMessage(), e);
        }
    }

    private static String currentBearerToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            return jwt.getTokenValue();
        }
        return null;
    }

    private static String escapeHtml(String value) {
        if (value == null) {
            return "";
        }
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
