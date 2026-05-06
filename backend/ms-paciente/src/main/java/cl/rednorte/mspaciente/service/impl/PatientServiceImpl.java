package cl.rednorte.mspaciente.service.impl;

import lombok.RequiredArgsConstructor;
import cl.rednorte.mspaciente.domain.Entity.IdentifierEntity;
import cl.rednorte.mspaciente.domain.Entity.PatientEntity;
import cl.rednorte.mspaciente.domain.types.IdentifierType;
import cl.rednorte.mspaciente.dto.PatientDTO;
import cl.rednorte.mspaciente.exception.BusinessException;
import cl.rednorte.mspaciente.exception.ResourceNotFoundException;
import cl.rednorte.mspaciente.mapper.PatientEntityMapper;
import cl.rednorte.mspaciente.repository.IdentifierRepository;
import cl.rednorte.mspaciente.repository.PatientRepository;
import cl.rednorte.mspaciente.service.PatientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final IdentifierRepository identifierRepository;

    @Override
    @Transactional
    public PatientDTO createPatient(PatientDTO patientDTO) {
        normalizePatientData(patientDTO);
        validateBusinessRules(patientDTO);

        PatientEntity entity = PatientEntityMapper.toEntity(patientDTO);
        entity.setActive(true);
        PatientEntity saved = patientRepository.save(entity);

        return PatientEntityMapper.toDTO(saved);
    }

    @Override
    @Transactional
    public PatientDTO updatePatient(String id, PatientDTO patientDTO) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient not found with id: " + id);
        }

        normalizePatientData(patientDTO);
        patientDTO.setId(id);
        validateBusinessRules(patientDTO);

        PatientEntity entity = PatientEntityMapper.toEntity(patientDTO);
        entity.setId(id);
        PatientEntity updated = patientRepository.save(entity);

        return PatientEntityMapper.toDTO(updated);
    }

    @Override
    public PatientDTO getPatientById(String id) {
        return patientRepository.findById(id)
                .map(PatientEntityMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(PatientEntityMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PatientDTO> getAllPatientsPaged(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("lastName").ascending());
        return patientRepository.findAll(pageable).map(PatientEntityMapper::toDTO);
    }

    @Override
    public List<PatientDTO> findByLastName(String lastName) {
        return patientRepository.findByLastNameContainingIgnoreCase(lastName).stream()
                .map(PatientEntityMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PatientDTO findByIdentifier(String type, String value) {
        return identifierRepository.findByTypeAndValue(IdentifierType.valueOf(type.toUpperCase()), value)
                .map(IdentifierEntity::getPatient)
                .map(PatientEntityMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with identifier: " + value));
    }

    @Override
    public List<PatientDTO> searchAdvanced(String name, String run, String coverageProvider) {
        String normalizedRun = (run != null && !run.isBlank()) ? normalizeRun(run) : null;
        String resolvedName = (name != null && name.isBlank()) ? null : name;
        String resolvedProvider = (coverageProvider != null && coverageProvider.isBlank()) ? null : coverageProvider;

        return patientRepository.searchAdvanced(resolvedName, normalizedRun, resolvedProvider, IdentifierType.RUN)
                .stream()
                .map(PatientEntityMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deactivatePatient(String id) {
        PatientEntity patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        patient.setActive(false);
        patientRepository.save(patient);
    }

    @Override
    @Transactional
    public void deletePatient(String id) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

    // RF63 — Normalización de RUN (sin puntos, con guión) y nombre (Title Case)
    private void normalizePatientData(PatientDTO dto) {
        if (dto.getFirstName() != null) dto.setFirstName(toTitleCase(dto.getFirstName().trim()));
        if (dto.getLastName() != null) dto.setLastName(toTitleCase(dto.getLastName().trim()));
        if (dto.getIdentifiers() != null) {
            dto.getIdentifiers().forEach(identifier -> {
                if (identifier.getType() == IdentifierType.RUN && identifier.getValue() != null) {
                    identifier.setValue(normalizeRun(identifier.getValue()));
                }
            });
        }
    }

    private String toTitleCase(String text) {
        if (text == null || text.isEmpty()) return text;
        return Arrays.stream(text.split("\\s+"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    private String normalizeRun(String run) {
        String cleaned = run.trim().replaceAll("\\.", "").toUpperCase();
        if (!cleaned.contains("-") && cleaned.length() > 1) {
            cleaned = cleaned.substring(0, cleaned.length() - 1) + "-" + cleaned.charAt(cleaned.length() - 1);
        }
        return cleaned;
    }

    // RF56 — Validación de reglas de negocio
    private void validateBusinessRules(PatientDTO dto) {
        if (dto.getIdentifiers() == null || dto.getIdentifiers().isEmpty()) {
            throw new BusinessException("Al menos un identificador es obligatorio");
        }

        long runCount = dto.getIdentifiers().stream()
                .filter(id -> id.getType() == IdentifierType.RUN)
                .count();

        if (runCount > 1) {
            throw new BusinessException("Un paciente no puede tener más de un RUN");
        }

        dto.getIdentifiers().stream()
                .filter(id -> id.getType() == IdentifierType.RUN)
                .forEach(id -> identifierRepository.findByTypeAndValue(IdentifierType.RUN, id.getValue())
                        .ifPresent(existing -> {
                            if (!existing.getPatient().getId().equals(dto.getId())) {
                                throw new BusinessException("El RUN " + id.getValue() + " ya existe en el sistema");
                            }
                        }));
    }
}
