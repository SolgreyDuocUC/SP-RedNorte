package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.ConditionDTO;
import cl.rednorte.ms_ficha_clinica.exception.ResourceNotFoundException;
import cl.rednorte.ms_ficha_clinica.model.ConditionEntity;
import cl.rednorte.ms_ficha_clinica.model.ConditionModel;
import cl.rednorte.ms_ficha_clinica.model.mapper.ConditionMapper;
import cl.rednorte.ms_ficha_clinica.repository.ConditionRepository;
import cl.rednorte.ms_ficha_clinica.repository.EncounterRepository;
import cl.rednorte.ms_ficha_clinica.service.ConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConditionServiceImpl implements ConditionService {

    private final ConditionRepository conditionRepository;
    private final EncounterRepository encounterRepository;

    @Override
    public ConditionDTO createCondition(ConditionDTO conditionDTO) {
        if (conditionDTO.getEncounterId() == null || !encounterRepository.existsById(conditionDTO.getEncounterId())) {
            throw new ResourceNotFoundException("Encounter not found with id: " + conditionDTO.getEncounterId());
        }
        ConditionModel model = ConditionMapper.toModel(conditionDTO);
        if (model.getRecordedDate() == null) {
            model.setRecordedDate(new Date());
        }
        ConditionEntity entity = ConditionMapper.toEntity(model);
        ConditionEntity savedEntity = conditionRepository.save(entity);
        return ConditionMapper.toDTO(ConditionMapper.toModel(savedEntity));
    }

    @Override
    public ConditionDTO getConditionById(String id) {
        return conditionRepository.findById(id)
                .map(ConditionMapper::toModel)
                .map(ConditionMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<ConditionDTO> getConditionsByPatientId(String patientId) {
        return conditionRepository.findByPatientId(patientId).stream()
                .map(ConditionMapper::toModel)
                .map(ConditionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConditionDTO> getConditionsByEncounterId(String encounterId) {
        return conditionRepository.findByEncounterId(encounterId).stream()
                .map(ConditionMapper::toModel)
                .map(ConditionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConditionDTO> getConditionHistory(String patientId) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, -1);
        Date oneYearAgo = cal.getTime();

        return conditionRepository.findByPatientIdAndRecordedDateAfter(patientId, oneYearAgo).stream()
                .map(ConditionMapper::toModel)
                .map(ConditionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCondition(String id) {
        conditionRepository.deleteById(id);
    }
}
