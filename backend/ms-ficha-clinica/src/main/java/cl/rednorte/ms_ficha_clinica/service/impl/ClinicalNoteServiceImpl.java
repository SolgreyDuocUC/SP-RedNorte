package cl.rednorte.ms_ficha_clinica.service.impl;

import cl.rednorte.ms_ficha_clinica.dto.ClinicalNoteDTO;
import cl.rednorte.ms_ficha_clinica.model.ClinicalNoteEntity;
import cl.rednorte.ms_ficha_clinica.model.ClinicalNoteModel;
import cl.rednorte.ms_ficha_clinica.model.mapper.ClinicalNoteMapper;
import cl.rednorte.ms_ficha_clinica.repository.ClinicalNoteRepository;
import cl.rednorte.ms_ficha_clinica.service.ClinicalNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClinicalNoteServiceImpl implements ClinicalNoteService {

    private final ClinicalNoteRepository clinicalNoteRepository;

    @Override
    public ClinicalNoteDTO createClinicalNote(ClinicalNoteDTO clinicalNoteDTO) {
        ClinicalNoteModel model = ClinicalNoteMapper.toModel(clinicalNoteDTO);
        if (model.getCreatedAt() == null) {
            model.setCreatedAt(new Date());
        }
        ClinicalNoteEntity entity = ClinicalNoteMapper.toEntity(model);
        ClinicalNoteEntity savedEntity = clinicalNoteRepository.save(entity);
        return ClinicalNoteMapper.toDTO(ClinicalNoteMapper.toModel(savedEntity));
    }

    @Override
    public ClinicalNoteDTO getClinicalNoteById(String id) {
        return clinicalNoteRepository.findById(id)
                .map(ClinicalNoteMapper::toModel)
                .map(ClinicalNoteMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<ClinicalNoteDTO> getClinicalNotesByPatientId(String patientId) {
        return clinicalNoteRepository.findByPatientId(patientId).stream()
                .map(ClinicalNoteMapper::toModel)
                .map(ClinicalNoteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ClinicalNoteDTO> getClinicalNotesByEncounterId(String encounterId) {
        return clinicalNoteRepository.findByEncounterId(encounterId).stream()
                .map(ClinicalNoteMapper::toModel)
                .map(ClinicalNoteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteClinicalNote(String id) {
        clinicalNoteRepository.deleteById(id);
    }
}
