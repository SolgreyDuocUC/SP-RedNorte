package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.EncounterDTO;
import cl.rednorte.ms_ficha_clinica.exception.ResourceNotFoundException;
import cl.rednorte.ms_ficha_clinica.exception.BusinessException;
import cl.rednorte.ms_ficha_clinica.model.EncounterEntity;
import cl.rednorte.ms_ficha_clinica.model.EncounterModel;
import cl.rednorte.ms_ficha_clinica.model.mapper.EncounterMapper;
import cl.rednorte.ms_ficha_clinica.model.status.EncounterStatus;
import cl.rednorte.ms_ficha_clinica.repository.ClinicalNoteRepository;
import cl.rednorte.ms_ficha_clinica.repository.ConditionRepository;
import cl.rednorte.ms_ficha_clinica.repository.EncounterRepository;
import cl.rednorte.ms_ficha_clinica.repository.ObservationRepository;
import cl.rednorte.ms_ficha_clinica.repository.ProcedureRepository;
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
    private final ObservationRepository observationRepository;
    private final ConditionRepository conditionRepository;
    private final ProcedureRepository procedureRepository;
    private final ClinicalNoteRepository clinicalNoteRepository;

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
        if (!encounterRepository.existsById(id)) {
            throw new ResourceNotFoundException("Encounter not found with id: " + id);
        }
        // encounterId no tiene FK a nivel de base de datos (ddl-auto=update
        // no la crea), así que sin este chequeo un delete dejaba notas,
        // observaciones, condiciones y procedimientos huérfanos apuntando a
        // un encounterId inexistente, sin error ni forma de detectarlo.
        boolean tieneRegistrosAsociados =
                !observationRepository.findByEncounterId(id).isEmpty()
                        || !conditionRepository.findByEncounterId(id).isEmpty()
                        || !procedureRepository.findByEncounterId(id).isEmpty()
                        || !clinicalNoteRepository.findByEncounterId(id).isEmpty();

        if (tieneRegistrosAsociados) {
            throw new BusinessException(
                    "No se puede eliminar el encuentro: tiene notas, observaciones, condiciones o procedimientos asociados.");
        }

        encounterRepository.deleteById(id);
    }
}
