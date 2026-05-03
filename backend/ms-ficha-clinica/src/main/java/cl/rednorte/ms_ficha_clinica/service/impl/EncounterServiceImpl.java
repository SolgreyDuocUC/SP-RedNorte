package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.EncounterDTO;
import cl.rednorte.ms_ficha_clinica.model.EncounterEntity;
import cl.rednorte.ms_ficha_clinica.model.EncounterModel;
import cl.rednorte.ms_ficha_clinica.model.mapper.EncounterMapper;
import cl.rednorte.ms_ficha_clinica.model.status.EncounterStatus;
import cl.rednorte.ms_ficha_clinica.repository.EncounterRepository;
import cl.rednorte.ms_ficha_clinica.service.EncounterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EncounterServiceImpl implements EncounterService {

    private final EncounterRepository encounterRepository;

    @Override
    public EncounterDTO createEncounter(EncounterDTO encounterDTO) {
        EncounterModel model = EncounterMapper.toModel(encounterDTO);
        if (model.getPeriodStart() == null) {
            model.setPeriodStart(new Date());
        }
        if (model.getStatus() == null) {
            model.setStatus(EncounterStatus.IN_PROGRESS);
        }
        EncounterEntity entity = EncounterMapper.toEntity(model);
        EncounterEntity savedEntity = encounterRepository.save(entity);
        return EncounterMapper.toDTO(EncounterMapper.toModel(savedEntity));
    }

    @Override
    public EncounterDTO getEncounterById(String id) {
        return encounterRepository.findById(id)
                .map(EncounterMapper::toModel)
                .map(EncounterMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<EncounterDTO> getEncountersByPatientId(String patientId) {
        return encounterRepository.findByPatientId(patientId).stream()
                .map(EncounterMapper::toModel)
                .map(EncounterMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EncounterDTO updateStatus(String id, String status) {
        return encounterRepository.findById(id)
                .map(entity -> {
                    try {
                        EncounterStatus newStatus = EncounterStatus.valueOf(status.toUpperCase());
                        entity.setStatus(newStatus);
                        if (newStatus == EncounterStatus.FINISHED) {
                            entity.setPeriodEnd(new Date());
                        }
                        EncounterEntity updatedEntity = encounterRepository.save(entity);
                        return EncounterMapper.toDTO(EncounterMapper.toModel(updatedEntity));
                    } catch (Exception e) {
                        return null;
                    }
                }).orElse(null);
    }

    @Override
    public void deleteEncounter(String id) {
        encounterRepository.deleteById(id);
    }
}
