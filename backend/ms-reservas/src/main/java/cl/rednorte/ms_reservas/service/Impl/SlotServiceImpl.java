package cl.rednorte.ms_reservas.service.Impl;

import cl.rednorte.ms_reservas.dto.SlotDTO;
import cl.rednorte.ms_reservas.exceptions.BusinessException;
import cl.rednorte.ms_reservas.model.SlotEntity;
import cl.rednorte.ms_reservas.model.mapper.SlotMapper;
import cl.rednorte.ms_reservas.repository.AppointmentRepository;
import cl.rednorte.ms_reservas.repository.SlotRepository;
import cl.rednorte.ms_reservas.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SlotServiceImpl implements SlotService {

    private static final String STATUS_BOOKED = "booked";

    private final SlotRepository repository;
    private final SlotMapper mapper;
    private final AppointmentRepository appointmentRepository;

    @Override
    public SlotDTO create(SlotDTO dto) {
        validateTimeFrame(dto);

        SlotEntity entity = mapper.toEntity(dto);
        entity.setId(UUID.randomUUID().toString());

        if (entity.getStatus() == null || entity.getStatus().isBlank()) {
            entity.setStatus("free");
        }

        return mapper.toDto(repository.save(entity));
    }

    @Override
    public Optional<SlotDTO> findById(String id) {
        return repository.findById(id).map(mapper::toDto);
    }

    @Override
    public List<SlotDTO> findAll() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<SlotDTO> findAvailableBySpecialty(String specialty) {
        return repository.findBySpecialtyAndStatus(specialty, "free").stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SlotDTO> findByPractitionerId(String practitionerId) {
        return repository.findByPractitionerId(practitionerId).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SlotDTO update(String id, SlotDTO dto) {
        // Se bloquea la fila (igual que en la creación de citas) para que
        // esta actualización no se cruce con una reserva concurrente sobre
        // el mismo slot.
        SlotEntity existing = repository.findByIdForUpdate(id)
                .orElseThrow(() -> new BusinessException("El bloque de agenda solicitado no existe."));

        // Si el slot tiene una cita "booked" activa, editarlo directamente
        // es peligroso: poner status=free reabre el mismo hueco de doble
        // reserva que ya se cerró en AppointmentServiceImpl (una segunda
        // reserva pasaría la validación de disponibilidad mientras la cita
        // original sigue "booked" sobre este slot), y cambiar start/end/
        // practitionerId deja a la cita con una copia desincronizada de
        // esos datos. Hay que cancelar la cita primero.
        boolean tieneCitaActiva = !appointmentRepository.findBySlot_IdAndStatus(id, STATUS_BOOKED).isEmpty();
        if (tieneCitaActiva) {
            throw new BusinessException(
                    "No se puede modificar un bloque de agenda con una cita reservada activa; cancela la cita primero.");
        }

        if (dto.getStart() != null)
            existing.setStart(dto.getStart());
        if (dto.getEnd() != null)
            existing.setEnd(dto.getEnd());
        if (dto.getStatus() != null)
            existing.setStatus(dto.getStatus());
        if (dto.getSpecialty() != null)
            existing.setSpecialty(dto.getSpecialty());
        if (dto.getPractitionerId() != null)
            existing.setPractitionerId(dto.getPractitionerId());

        if (existing.getEnd().before(existing.getStart()) || existing.getEnd().equals(existing.getStart())) {
            throw new BusinessException("La fecha de fin debe ser posterior a la de inicio.");
        }

        return mapper.toDto(repository.save(existing));
    }

    @Override
    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new BusinessException("El bloque de agenda solicitado no existe.");
        }
        // Si el slot tiene una cita "booked" activa, borrarlo lo dejaría
        // huérfano: al ser @SoftDelete, la cita seguiría existiendo pero
        // getSlot() resolvería null en la próxima carga, rompiendo el guard
        // de cancel()/reassign() y dejando al paciente sin cupo real.
        boolean tieneCitaActiva = !appointmentRepository.findBySlot_IdAndStatus(id, STATUS_BOOKED).isEmpty();
        if (tieneCitaActiva) {
            throw new BusinessException(
                    "No se puede eliminar un bloque de agenda con una cita reservada activa; cancela la cita primero.");
        }
        repository.deleteById(id);
    }

    private void validateTimeFrame(SlotDTO dto) {
        if (dto.getStart() == null || dto.getEnd() == null) {
            throw new BusinessException("Las fechas de inicio y fin del bloque son obligatorias.");
        }
        if (dto.getEnd().before(dto.getStart()) || dto.getEnd().equals(dto.getStart())) {
            throw new BusinessException("La fecha de fin debe ser posterior a la de inicio.");
        }
    }
}
