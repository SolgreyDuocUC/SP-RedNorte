package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.ObservationDTO;
import cl.rednorte.ms_ficha_clinica.exception.ResourceNotFoundException;
import cl.rednorte.ms_ficha_clinica.model.ObservationEntity;
import cl.rednorte.ms_ficha_clinica.repository.EncounterRepository;
import cl.rednorte.ms_ficha_clinica.repository.ObservationRepository;
import cl.rednorte.ms_ficha_clinica.service.ObservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ObservationServiceImpl implements ObservationService {

    private final ObservationRepository observationRepository;
    private final EncounterRepository encounterRepository;

    @Override
    public ObservationDTO createObservation(ObservationDTO dto) {
        if (dto.getEncounterId() == null || !encounterRepository.existsById(dto.getEncounterId())) {
            throw new ResourceNotFoundException("Encounter not found with id: " + dto.getEncounterId());
        }
        ObservationEntity entity = mapToEntity(dto);
        if (entity.getId() == null || entity.getId().isEmpty()) {
            entity.setId(UUID.randomUUID().toString());
        }
        ObservationEntity savedEntity = observationRepository.save(entity);
        return mapToDTO(savedEntity);
    }

    @Override
    public ObservationDTO getObservationById(String id) {
        ObservationEntity entity = observationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Observation not found with id: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ObservationDTO> getAllObservations() {
        return observationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ObservationDTO> getObservationsByPatientId(String patientId) {
        return observationRepository.findByPatientId(patientId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ObservationDTO> getObservationsByEncounterId(String encounterId) {
        return observationRepository.findByEncounterId(encounterId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ObservationDTO> getObservationHistory(String patientId) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, -1);
        Date oneYearAgo = cal.getTime();

        return observationRepository.findByPatientIdAndEffectiveDateAfter(patientId, oneYearAgo).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ObservationDTO updateObservation(String id, ObservationDTO dto) {
        ObservationEntity existingEntity = observationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Observation not found with id: " + id));

        // patientId/encounterId no son editables: una observación pertenece
        // al paciente/encuentro con el que fue creada. Permitir cambiarlos
        // aquí permitía re-asignar en silencio un resultado clínico a otro
        // paciente con un simple PUT.
        existingEntity.setCode(dto.getCode() != null ? dto.getCode() : existingEntity.getCode());
        existingEntity.setValue(dto.getValue() != null ? dto.getValue() : existingEntity.getValue());
        existingEntity.setUnit(dto.getUnit() != null ? dto.getUnit() : existingEntity.getUnit());
        existingEntity.setEffectiveDate(
                dto.getEffectiveDate() != null ? dto.getEffectiveDate() : existingEntity.getEffectiveDate());

        ObservationEntity updatedEntity = observationRepository.save(existingEntity);
        return mapToDTO(updatedEntity);
    }

    @Override
    public void deleteObservation(String id) {
        if (!observationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Observation not found with id: " + id);
        }
        observationRepository.deleteById(id);
    }

    private ObservationEntity mapToEntity(ObservationDTO dto) {
        return ObservationEntity.builder()
                .id(dto.getId())
                .patientId(dto.getPatientId())
                .encounterId(dto.getEncounterId())
                .code(dto.getCode())
                .value(dto.getValue())
                .unit(dto.getUnit())
                .effectiveDate(dto.getEffectiveDate())
                .build();
    }

    private ObservationDTO mapToDTO(ObservationEntity entity) {
        return ObservationDTO.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .encounterId(entity.getEncounterId())
                .code(entity.getCode())
                .value(entity.getValue())
                .unit(entity.getUnit())
                .effectiveDate(entity.getEffectiveDate())
                .build();
    }
}
