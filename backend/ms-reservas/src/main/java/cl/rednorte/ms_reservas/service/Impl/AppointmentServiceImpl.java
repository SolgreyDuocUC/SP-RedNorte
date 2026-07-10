package cl.rednorte.ms_reservas.service.Impl;

import cl.rednorte.ms_reservas.dto.AppointmentDTO;
import cl.rednorte.ms_reservas.exceptions.BusinessException;
import cl.rednorte.ms_reservas.model.AppointmentEntity;
import cl.rednorte.ms_reservas.model.SlotEntity;
import cl.rednorte.ms_reservas.model.mapper.AppointmentMapper;
import cl.rednorte.ms_reservas.repository.AppointmentRepository;
import cl.rednorte.ms_reservas.repository.SlotRepository;
import cl.rednorte.ms_reservas.service.AppointmentService;
import cl.rednorte.ms_reservas.service.ReassignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final AppointmentNotifier notifier;

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
            // Reserva directa sobre un bloque de agenda disponible.
            // Se bloquea la fila (SELECT ... FOR UPDATE) para que dos
            // reservas concurrentes sobre el mismo slot no puedan pasar
            // ambas la validación de estado "free" (double-booking).
            SlotEntity slot = slotRepository.findByIdForUpdate(dto.getSlotId())
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
            notifier.notifyBooked(saved);
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

        String oldStatus = existing.getStatus();

        if (dto.getStart() != null)
            existing.setStart(dto.getStart());
        if (dto.getEnd() != null)
            existing.setEnd(dto.getEnd());
        if (dto.getDescription() != null)
            existing.setDescription(dto.getDescription());
        if (dto.getPractitionerId() != null)
            existing.setPractitionerId(dto.getPractitionerId());
        // patientId NO es editable vía update(): ningún flujo legítimo
        // (reagendar, cancelar, cambiar prioridad/descripción) necesita
        // cambiar el dueño de una cita. Permitirlo dejaba "secuestrar" en
        // silencio la reserva de un paciente reasignándola a otro id, sin
        // pasar por la validación de disponibilidad de create().
        if (dto.getSpecialty() != null)
            existing.setSpecialty(dto.getSpecialty());
        if (dto.getPriority() != null)
            existing.setPriority(dto.getPriority());

        if (dto.getStatus() != null) {
            // Una cita solo puede pasar a "booked" a través de create() (con
            // un slot validado y bloqueado) o de la reasignación automática
            // de lista de espera — nunca por una edición manual de estado.
            // Sin este resguardo, una cita cancelada (que ya perdió su
            // referencia al slot) podía "resucitarse" a booked mientras el
            // slot original ya fue reasignado a otro paciente, dejando dos
            // citas booked apuntando al mismo slot.
            if (STATUS_BOOKED.equalsIgnoreCase(dto.getStatus()) && !STATUS_BOOKED.equalsIgnoreCase(oldStatus)) {
                throw new BusinessException(
                        "Una cita solo puede quedar 'booked' mediante la creación de una reserva o la reasignación automática de la lista de espera.");
            }
            existing.setStatus(dto.getStatus());
        }

        AppointmentEntity saved = repository.save(existing);

        // Si cambió el estado a "booked", enviar correo
        if (STATUS_BOOKED.equalsIgnoreCase(saved.getStatus()) && !STATUS_BOOKED.equalsIgnoreCase(oldStatus)) {
            notifier.notifyBooked(saved);
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
        // Se guarda la referencia y se limpia del appointment cancelado ANTES
        // de reasignar el slot: si no se limpia, una edición posterior que
        // vuelva a poner esta cita en "booked" quedaría apuntando al mismo
        // slot que la reasignación automática ya le entregó a otro paciente
        // (dos citas booked sobre un mismo slot).
        SlotEntity slot = existing.getSlot();
        existing.setStatus(STATUS_CANCELLED);
        existing.setSlot(null);
        existing.setStart(null);
        existing.setEnd(null);
        AppointmentEntity saved = repository.save(existing);

        if (slot != null) {
            reassignmentService.reassign(slot);
        }

        return saved;
    }
}
