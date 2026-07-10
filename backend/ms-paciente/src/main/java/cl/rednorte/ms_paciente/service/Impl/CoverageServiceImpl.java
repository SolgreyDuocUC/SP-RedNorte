package cl.rednorte.ms_paciente.service.Impl;

import cl.rednorte.ms_paciente.dto.CoverageDTO;
import cl.rednorte.ms_paciente.exceptions.BusinessException;
import cl.rednorte.ms_paciente.exceptions.ResourceNotFoundException;
import cl.rednorte.ms_paciente.model.CoverageEntity;
import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.repository.CoverageRepository;
import cl.rednorte.ms_paciente.repository.PatientRepository;
import cl.rednorte.ms_paciente.service.CoverageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoverageServiceImpl implements CoverageService {

    private final CoverageRepository repository;
    private final PatientRepository patientRepository;

    @Override
    public List<CoverageDTO> findAll() {

        return repository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CoverageDTO create(CoverageDTO dto) {

        if (dto.getType() == null || dto.getType().isBlank()) {
            throw new BusinessException("El tipo de cobertura es obligatorio");
        }
        if (dto.getPatientId() == null || dto.getPatientId().isBlank()) {
            // CoverageEntity.patient es la FK dueña de la relación y es
            // NOT NULL en base de datos. Antes este método nunca la
            // completaba, así que CUALQUIER llamada a este endpoint fallaba
            // siempre con una violación de constraint (500).
            throw new BusinessException("El id del paciente es obligatorio");
        }

        PatientEntity patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con id: " + dto.getPatientId()));

        if (patient.getCoverage() != null) {
            throw new BusinessException("El paciente ya tiene una cobertura asociada.");
        }

        CoverageEntity entity = CoverageEntity.builder()
                .id(UUID.randomUUID().toString())
                .type(dto.getType())
                .provider(dto.getProvider())
                .patient(patient)
                .build();

        return toDto(repository.save(entity));
    }

    // Mapper interno
    private CoverageDTO toDto(CoverageEntity entity) {
        return CoverageDTO.builder()
                .id(entity.getId())
                .patientId(entity.getPatient() != null ? entity.getPatient().getId() : null)
                .type(entity.getType())
                .provider(entity.getProvider())
                .build();
    }
}
