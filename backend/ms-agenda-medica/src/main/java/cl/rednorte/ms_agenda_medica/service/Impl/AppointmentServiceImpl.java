package cl.rednorte.ms_agenda_medica.service.Impl;

import cl.rednorte.ms_agenda_medica.dto.AppointmentDTO;
import cl.rednorte.ms_agenda_medica.exceptions.BusinessException;
import cl.rednorte.ms_agenda_medica.model.AppointmentEntity;
import cl.rednorte.ms_agenda_medica.model.mapper.AppointmentMapper;
import cl.rednorte.ms_agenda_medica.repository.AppointmentRepository;
import cl.rednorte.ms_agenda_medica.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository repository;
    private final AppointmentMapper mapper;

    @Override
    public AppointmentDTO create(AppointmentDTO dto) {
        validateTimeFrame(dto);
        AppointmentEntity entity = mapper.toEntity(dto);
        entity.setId(UUID.randomUUID().toString());
        entity.setCreatedAt(new Date());

        if (entity.getStatus() == null || entity.getStatus().isEmpty()) {
            entity.setStatus("booked");
        }

        return mapper.toDto(repository.save(entity));
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
    public AppointmentDTO update(String id, AppointmentDTO dto) {
        return repository.findById(id).map(existing -> {
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

            return mapper.toDto(repository.save(existing));
        }).orElseThrow(() -> new BusinessException("La cita solicitada no existe."));
    }

    @Override
    public void delete(String id) {
        repository.findById(id).ifPresent(existing -> {
            existing.setStatus("cancelled");
            repository.save(existing);
        });
    }

    private void validateTimeFrame(AppointmentDTO dto) {
        if (dto.getStart() == null || dto.getEnd() == null) {
            throw new BusinessException("Las fechas de inicio y fin son obligatorias.");
        }
        if (dto.getEnd().before(dto.getStart())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la de inicio.");
        }
        if (dto.getPatientId() == null || dto.getPractitionerId() == null) {
            throw new BusinessException("Tanto paciente como profesional son obligatorios.");
        }
    }
}
