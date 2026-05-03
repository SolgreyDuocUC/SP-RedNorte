package ms_paciente.service.impl;

import lombok.RequiredArgsConstructor;
import ms_paciente.domain.Entity.CoverageEntity;
import ms_paciente.domain.Entity.PatientEntity;
import ms_paciente.dto.CoverageDTO;
import ms_paciente.mapper.PatientEntityMapper;
import ms_paciente.repository.CoverageRepository;
import ms_paciente.repository.PatientRepository;
import ms_paciente.service.CoverageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoverageServiceImpl implements CoverageService {

    private final CoverageRepository coverageRepository;
    private final PatientRepository patientRepository;

    @Override
    @Transactional
    public CoverageDTO createCoverage(String patientId, CoverageDTO coverageDTO) {
        PatientEntity patient = patientRepository.findById(UUID.fromString(patientId))
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        CoverageEntity entity = PatientEntityMapper.toEntity(coverageDTO, patient);
        CoverageEntity saved = coverageRepository.save(entity);
        
        return PatientEntityMapper.toDTO(saved);
    }

    @Override
    public List<CoverageDTO> getCoveragesByPatientId(String patientId) {
        return coverageRepository.findByPatientId(UUID.fromString(patientId)).stream()
                .map(PatientEntityMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteCoverage(String id) {
        coverageRepository.deleteById(UUID.fromString(id));
    }
}
