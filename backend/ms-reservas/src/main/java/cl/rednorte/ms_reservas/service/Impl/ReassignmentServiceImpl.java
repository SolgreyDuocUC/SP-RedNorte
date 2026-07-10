package cl.rednorte.ms_reservas.service.Impl;

import cl.rednorte.ms_reservas.dto.AppointmentDTO;
import cl.rednorte.ms_reservas.model.AppointmentEntity;
import cl.rednorte.ms_reservas.model.SlotEntity;
import cl.rednorte.ms_reservas.model.mapper.AppointmentMapper;
import cl.rednorte.ms_reservas.repository.AppointmentRepository;
import cl.rednorte.ms_reservas.repository.SlotRepository;
import cl.rednorte.ms_reservas.service.ReassignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReassignmentServiceImpl implements ReassignmentService {

    private static final String STATUS_WAITLIST = "waitlist";
    private static final String STATUS_BOOKED = "booked";
    private static final String SLOT_STATUS_FREE = "free";
    private static final String SLOT_STATUS_BUSY = "busy";

    private final AppointmentRepository appointmentRepository;
    private final SlotRepository slotRepository;
    private final AppointmentMapper mapper;
    private final AppointmentNotifier notifier;

    @Override
    @Transactional
    public Optional<AppointmentDTO> reassign(SlotEntity freedSlot) {
        // Bloquea la fila del slot para serializar reasignaciones concurrentes
        // sobre el mismo bloque (p. ej. dos llamadas a reassign para el mismo
        // freedSlot casi simultáneas).
        SlotEntity slot = slotRepository.findByIdForUpdate(freedSlot.getId()).orElse(freedSlot);

        // Candidatos de la lista de espera para la misma especialidad,
        // ordenados por prioridad (Crítico > Urgente > Normal) y luego por
        // antigüedad de la solicitud (FIFO). Se bloquean las filas candidatas
        // para que dos reasignaciones concurrentes no tomen el mismo
        // paciente de la lista de espera (lost update).
        List<AppointmentEntity> waitlist = appointmentRepository
                .findByStatusAndSpecialtyOrderByPriorityDescCreatedAtAscForUpdate(STATUS_WAITLIST, slot.getSpecialty());

        if (waitlist.isEmpty()) {
            slot.setStatus(SLOT_STATUS_FREE);
            slotRepository.save(slot);
            return Optional.empty();
        }

        AppointmentEntity candidate = waitlist.get(0);
        candidate.setSlot(slot);
        candidate.setPractitionerId(slot.getPractitionerId());
        candidate.setStart(slot.getStart());
        candidate.setEnd(slot.getEnd());
        candidate.setStatus(STATUS_BOOKED);

        slot.setStatus(SLOT_STATUS_BUSY);
        slotRepository.save(slot);

        AppointmentEntity saved = appointmentRepository.save(candidate);
        // Antes, la promoción automática desde la lista de espera guardaba
        // la cita directamente aquí sin pasar por el único código que
        // enviaba el correo de confirmación (AppointmentServiceImpl.update),
        // así que el paciente promovido nunca se enteraba de que ya tenía
        // hora asignada.
        notifier.notifyBooked(saved);

        return Optional.of(mapper.toDto(saved));
    }
}
