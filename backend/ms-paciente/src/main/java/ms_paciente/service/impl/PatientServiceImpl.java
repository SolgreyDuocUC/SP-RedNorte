package ms_paciente.service.impl;

import lombok.RequiredArgsConstructor;
import ms_paciente.domain.Entity.IdentifierEntity;
import ms_paciente.domain.Entity.PatientEntity;
import ms_paciente.domain.types.IdentifierType;
import ms_paciente.dto.PatientDTO;
import ms_paciente.mapper.PatientEntityMapper;
import ms_paciente.repository.IdentifierRepository;
import ms_paciente.repository.PatientRepository;
import ms_paciente.service.PatientService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final IdentifierRepository identifierRepository;

    @Override
    @Transactional
    public PatientDTO createPatient(PatientDTO patientDTO) {
        validateBusinessRules(patientDTO);
        
        PatientEntity entity = PatientEntityMapper.toEntity(patientDTO);
        PatientEntity saved = patientRepository.save(entity);
        
        return PatientEntityMapper.toDTO(saved);
    }

    @Override
    @Transactional
    public PatientDTO updatePatient(String id, PatientDTO patientDTO) {
        UUID uuid = UUID.fromString(id);
        if (!patientRepository.existsById(uuid)) {
            throw new RuntimeException("Patient not found with id: " + id);
        }
        
        validateBusinessRules(patientDTO);
        
        PatientEntity entity = PatientEntityMapper.toEntity(patientDTO);
        entity.setId(String.valueOf(uuid)); // Ensure correct ID
        PatientEntity updated = patientRepository.save(entity);
        
        return PatientEntityMapper.toDTO(updated);
    }

    @Override
    public PatientDTO getPatientById(String id) {
        return patientRepository.findById(UUID.fromString(id))
                .map(PatientEntityMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(PatientEntityMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PatientDTO> findByLastName(String lastName) {
        // Assume repository has this or implement custom query
        return List.of(); 
    }

    @Override
    public PatientDTO findByIdentifier(String type, String value) {
        return identifierRepository.findByTypeAndValue(IdentifierType.valueOf(type.toUpperCase()), value)
                .map(IdentifierEntity::getPatient)
                .map(PatientEntityMapper::toDTO)
                .orElse(null);
    }

    @Override
    @Transactional
    public void deletePatient(String id) {
        patientRepository.deleteById(UUID.fromString(id));
    }

    private void validateBusinessRules(PatientDTO dto) {
        if (dto.getIdentifiers() == null || dto.getIdentifiers().isEmpty()) {
            throw new RuntimeException("At least one identifier is required");
        }

        // RF01: Validation RUN uniqueness and counts
        long runCount = dto.getIdentifiers().stream()
                .filter(id -> id.getType() == IdentifierType.RUN)
                .count();

        if (runCount > 1) {
            throw new RuntimeException("A patient cannot have more than one RUN");
        }

        dto.getIdentifiers().stream()
                .filter(id -> id.getType() == IdentifierType.RUN)
                .forEach(id -> {
                    if (dto.getId() == null && identifierRepository.existsByTypeAndValue(IdentifierType.RUN, id.getValue())) {
                        throw new RuntimeException("RUN " + id.getValue() + " already exists in the system");
                    }
                });
    }
}
