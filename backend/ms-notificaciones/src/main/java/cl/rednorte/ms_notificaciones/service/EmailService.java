package cl.rednorte.ms_notificaciones.service;

import cl.rednorte.ms_notificaciones.dto.NotificationRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEmail(NotificationRequest request) {
        log.info("Enviando correo a {} con asunto: {}", request.getRecipient(), request.getSubject());
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            if (fromEmail != null) {
                helper.setFrom(fromEmail);
            }
            if (request.getRecipient() != null) {
                helper.setTo(request.getRecipient());
            }
            if (request.getSubject() != null) {
                helper.setSubject(request.getSubject());
            }
            if (request.getBody() != null) {
                helper.setText(request.getBody(), true); // true indica que el contenido es HTML
            }

            mailSender.send(message);
            log.info("Correo enviado exitosamente a {}", request.getRecipient());
        } catch (MessagingException e) {
            log.error("Error al preparar o enviar el correo a {}: {}", request.getRecipient(), e.getMessage(), e);
            throw new RuntimeException("Error al enviar correo: " + e.getMessage(), e);
        }
    }
}
