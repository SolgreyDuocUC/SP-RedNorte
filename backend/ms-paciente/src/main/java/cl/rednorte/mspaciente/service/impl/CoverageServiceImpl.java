package cl.rednorte.mspaciente.service.impl;

import lombok.RequiredArgsConstructor;
import cl.rednorte.mspaciente.domain.Entity.CoverageEntity;
import cl.rednorte.mspaciente.domain.Entity.PatientEntity;
import cl.rednorte.mspaciente.dto.CoverageDTO;
import cl.rednorte.mspaciente.exception.ResourceNotFoundException;
import cl.rednorte.mspaciente.mapper.PatientEntityMapper;
import cl.rednorte.mspaciente.repository.CoverageRepository;
import cl.rednorte.mspaciente.repository.PatientRepository;
import cl.rednorte.mspaciente.service.CoverageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoverageServiceImpl implements CoverageService {

    private final CoverageRepository coverageRepository;
    private final PatientRepository patientRepository;

    @Override
    @Transactional
    public CoverageDTO createCoverage(String patientId, CoverageDTO coverageDTO) {
        PatientEntity patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + patientId));

        CoverageEntity entity = PatientEntityMapper.toCoverageEntity(coverageDTO, patient);
        CoverageEntity saved = coverageRepository.save(entity);

        return PatientEntityMapper.toCoverageDTO(saved);
    }

    // RF54 — Actualización de previsión
    @Override
    @Transactional
    public CoverageDTO updateCoverage(String id, CoverageDTO coverageDTO) {
        CoverageEntity existing = coverageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coverage not found with id: " + id));

        existing.setType(coverageDTO.getType());
        existing.setProvider(coverageDTO.getProvider());
        existing.setPlan(coverageDTO.getPlan());
        existing.setStatus(coverageDTO.getStatus());

        CoverageEntity updated = coverageRepository.save(existing);
        return PatientEntityMapper.toCoverageDTO(updated);
    }

    @Override
    public List<CoverageDTO> getCoveragesByPatientId(String patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new ResourceNotFoundException("Patient not found with id: " + patientId);
        }
        return coverageRepository.findByPatientId(patientId).stream()
                .map(PatientEntityMapper::toCoverageDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteCoverage(String id) {
        if (!coverageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Coverage not found with id: " + id);
        }
        coverageRepository.deleteById(id);
    }
}
