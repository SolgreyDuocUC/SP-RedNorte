package cl.rednorte.ms_reservas.service.Impl;

import cl.rednorte.ms_reservas.dto.AppointmentDTO;
import cl.rednorte.ms_reservas.dto.PatientIntegrationDTO;
import cl.rednorte.ms_reservas.dto.NotificationRequest;
import cl.rednorte.ms_reservas.exceptions.BusinessException;
import cl.rednorte.ms_reservas.model.AppointmentEntity;
import cl.rednorte.ms_reservas.model.SlotEntity;
import cl.rednorte.ms_reservas.model.mapper.AppointmentMapper;
import cl.rednorte.ms_reservas.repository.AppointmentRepository;
import cl.rednorte.ms_reservas.repository.SlotRepository;
import cl.rednorte.ms_reservas.service.AppointmentService;
import cl.rednorte.ms_reservas.service.ReassignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private static final String STATUS_BOOKED = "booked";
    private static final String STATUS_CANCELLED = "cancelled";
    private static final String STATUS_WAITLIST = "waitlist";
    private static final String SLOT_STATUS_FREE = "free";
    private static final String SLOT_STATUS_BUSY = "busy";

    private final AppointmentRepository repository;
    private final SlotRepository slotRepository;
    private final AppointmentMapper mapper;
    private final ReassignmentService reassignmentService;

    @Value("${services.paciente.url}")
    private String pacienteUrl;

    @Value("${services.notificaciones.url}")
    private String notificacionesUrl;

    @Value("${app.security.notification-secret:}")
    private String notificationSecret;

    @Override
    @Transactional
    public AppointmentDTO create(AppointmentDTO dto) {
        if (dto.getPatientId() == null || dto.getPatientId().isBlank()) {
            throw new BusinessException("El paciente es obligatorio.");
        }
        if (dto.getSpecialty() == null || dto.getSpecialty().isBlank()) {
            throw new BusinessException("La especialidad es obligatoria.");
        }

        AppointmentEntity entity = mapper.toEntity(dto);
        entity.setId(UUID.randomUUID().toString());
        entity.setCreatedAt(new Date());

        if (entity.getPriority() == null) {
            entity.setPriority(1); // Normal por defecto
        }

        if (dto.getSlotId() != null && !dto.getSlotId().isBlank()) {
            // Reserva directa sobre un bloque de agenda disponible
            SlotEntity slot = slotRepository.findById(dto.getSlotId())
                    .orElseThrow(() -> new BusinessException("El bloque de agenda indicado no existe."));

            if (!SLOT_STATUS_FREE.equalsIgnoreCase(slot.getStatus())) {
                throw new BusinessException("El bloque de agenda seleccionado no está disponible.");
            }

            entity.setSlot(slot);
            entity.setPractitionerId(slot.getPractitionerId());
            entity.setStart(slot.getStart());
            entity.setEnd(slot.getEnd());
            entity.setStatus(STATUS_BOOKED);

            slot.setStatus(SLOT_STATUS_BUSY);
            slotRepository.save(slot);
        } else {
            // Sin bloque disponible: ingresa a la lista de espera
            entity.setSlot(null);
            entity.setStart(null);
            entity.setEnd(null);
            entity.setStatus(STATUS_WAITLIST);
        }

        AppointmentEntity saved = repository.save(entity);

        // Si se reservó exitosamente, enviar notificación por correo
        if (STATUS_BOOKED.equalsIgnoreCase(saved.getStatus())) {
            sendConfirmationEmail(saved);
        }

        return mapper.toDto(saved);
    }

    @Override
    public Optional<AppointmentDTO> findById(String id) {
        return repository.findById(id).map(mapper::toDto);
    }

    @Override
    public List<AppointmentDTO> findAll() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> findByPatientId(String patientId) {
        return repository.findByPatientId(patientId).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> findByPractitionerId(String practitionerId) {
        return repository.findByPractitionerId(practitionerId).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> findWaitlist() {
        return repository.findByStatusOrderByPriorityDescCreatedAtAsc(STATUS_WAITLIST).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> findWaitlistBySpecialty(String specialty) {
        return repository.findByStatusAndSpecialtyOrderByPriorityDescCreatedAtAsc(STATUS_WAITLIST, specialty).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AppointmentDTO update(String id, AppointmentDTO dto) {
        AppointmentEntity existing = repository.findById(id)
                .orElseThrow(() -> new BusinessException("La cita solicitada no existe."));

        if (dto.getStatus() != null && STATUS_CANCELLED.equalsIgnoreCase(dto.getStatus())
                && !STATUS_CANCELLED.equalsIgnoreCase(existing.getStatus())) {
            return mapper.toDto(cancel(existing));
        }

        if (dto.getStart() != null)
            existing.setStart(dto.getStart());
        if (dto.getEnd() != null)
            existing.setEnd(dto.getEnd());
        if (dto.getStatus() != null)
            existing.setStatus(dto.getStatus());
        if (dto.getDescription() != null)
            existing.setDescription(dto.getDescription());
        if (dto.getPractitionerId() != null)
            existing.setPractitionerId(dto.getPractitionerId());
        if (dto.getPatientId() != null)
            existing.setPatientId(dto.getPatientId());
        if (dto.getSpecialty() != null)
            existing.setSpecialty(dto.getSpecialty());
        if (dto.getPriority() != null)
            existing.setPriority(dto.getPriority());

        String oldStatus = existing.getStatus();
        if (dto.getStatus() != null)
            existing.setStatus(dto.getStatus());

        AppointmentEntity saved = repository.save(existing);

        // Si cambió el estado a "booked", enviar correo
        if (STATUS_BOOKED.equalsIgnoreCase(saved.getStatus()) && !STATUS_BOOKED.equalsIgnoreCase(oldStatus)) {
            sendConfirmationEmail(saved);
        }

        return mapper.toDto(saved);
    }

    @Override
    @Transactional
    public void delete(String id) {
        repository.findById(id).ifPresent(this::cancel);
    }

    /**
     * Cancela una cita y, si tenía un bloque de agenda asociado, lo libera
     * y dispara la reasignación automática hacia la lista de espera.
     */
    private AppointmentEntity cancel(AppointmentEntity existing) {
        existing.setStatus(STATUS_CANCELLED);
        AppointmentEntity saved = repository.save(existing);

        SlotEntity slot = existing.getSlot();
        if (slot != null) {
            reassignmentService.reassign(slot);
        }

        return saved;
    }

    private void sendConfirmationEmail(AppointmentEntity entity) {
        try {
            System.out.println("Buscando información de paciente para ID: " + entity.getPatientId());
            RestClient restClient = RestClient.create();
            PatientIntegrationDTO patient = restClient.get()
                    .uri(pacienteUrl + "/api/v1/patients/" + entity.getPatientId())
                    .retrieve()
                    .body(PatientIntegrationDTO.class);

            if (patient == null || patient.getEmail() == null || patient.getEmail().isBlank()) {
                System.out.println("No se pudo obtener el correo electrónico del paciente con ID: " + entity.getPatientId());
                return;
            }

            String subject = "Confirmación de Cita Médica - RedNorte";
            String startStr = entity.getStart() != null ? entity.getStart().toString() : "No especificado";
            String htmlBody = String.format(
                    "<h3>Hola %s %s,</h3>" +
                    "<p>Tu cita médica ha sido agendada con éxito.</p>" +
                    "<ul>" +
                    "<li><strong>Especialidad:</strong> %s</li>" +
                    "<li><strong>Fecha/Hora de Inicio:</strong> %s</li>" +
                    "</ul>" +
                    "<p>Gracias por atenderte en la Red de Salud RedNorte.</p>",
                    patient.getFirstName(), patient.getLastName(),
                    entity.getSpecialty(), startStr
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

            System.out.println("Notificación de cita enviada correctamente a: " + patient.getEmail());
        } catch (Exception e) {
            System.err.println("Error al enviar la notificación por correo: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
