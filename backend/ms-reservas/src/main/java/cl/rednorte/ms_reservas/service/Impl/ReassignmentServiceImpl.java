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

    @Override
    @Transactional
    public Optional<AppointmentDTO> reassign(SlotEntity freedSlot) {
        // Candidatos de la lista de espera para la misma especialidad,
        // ordenados por prioridad (Crítico > Urgente > Normal) y luego por
        // antigüedad de la solicitud (FIFO).
        List<AppointmentEntity> waitlist = appointmentRepository
                .findByStatusAndSpecialtyOrderByPriorityDescCreatedAtAsc(STATUS_WAITLIST, freedSlot.getSpecialty());

        if (waitlist.isEmpty()) {
            freedSlot.setStatus(SLOT_STATUS_FREE);
            slotRepository.save(freedSlot);
            return Optional.empty();
        }

        AppointmentEntity candidate = waitlist.get(0);
        candidate.setSlot(freedSlot);
        candidate.setPractitionerId(freedSlot.getPractitionerId());
        candidate.setStart(freedSlot.getStart());
        candidate.setEnd(freedSlot.getEnd());
        candidate.setStatus(STATUS_BOOKED);

        freedSlot.setStatus(SLOT_STATUS_BUSY);
        slotRepository.save(freedSlot);

        return Optional.of(mapper.toDto(appointmentRepository.save(candidate)));
    }
}
