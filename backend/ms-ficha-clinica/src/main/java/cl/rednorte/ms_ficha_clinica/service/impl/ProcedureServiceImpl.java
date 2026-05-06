package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.ProcedureDTO;
import cl.rednorte.ms_ficha_clinica.model.ProcedureEntity;
import cl.rednorte.ms_ficha_clinica.model.ProcedureModel;
import cl.rednorte.ms_ficha_clinica.model.mapper.ProcedureMapper;
import cl.rednorte.ms_ficha_clinica.repository.ProcedureRepository;
import cl.rednorte.ms_ficha_clinica.service.ProcedureService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProcedureServiceImpl implements ProcedureService {

    private final ProcedureRepository procedureRepository;

    @Override
    public ProcedureDTO createProcedure(ProcedureDTO procedureDTO) {
        ProcedureModel model = ProcedureMapper.toModel(procedureDTO);
        if (model.getPerformedDate() == null) {
            model.setPerformedDate(new Date());
        }
        ProcedureEntity entity = ProcedureMapper.toEntity(model);
        ProcedureEntity savedEntity = procedureRepository.save(entity);
        return ProcedureMapper.toDTO(ProcedureMapper.toModel(savedEntity));
    }

    @Override
    public ProcedureDTO getProcedureById(String id) {
        return procedureRepository.findById(id)
                .map(ProcedureMapper::toModel)
                .map(ProcedureMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<ProcedureDTO> getProceduresByPatientId(String patientId) {
        return procedureRepository.findByPatientId(patientId).stream()
                .map(ProcedureMapper::toModel)
                .map(ProcedureMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProcedureDTO> getProceduresByEncounterId(String encounterId) {
        return procedureRepository.findByEncounterId(encounterId).stream()
                .map(ProcedureMapper::toModel)
                .map(ProcedureMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProcedure(String id) {
        procedureRepository.deleteById(id);
    }
}
