package cl.rednorte.ms_usuarios.service.Impl;

import cl.rednorte.ms_usuarios.dto.DeceasedDTO;
import cl.rednorte.ms_usuarios.model.Deceased;
import cl.rednorte.ms_usuarios.repository.DeceasedRepository;
import cl.rednorte.ms_usuarios.service.DeceasedService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeceasedServiceImpl implements DeceasedService {

    private final DeceasedRepository deceasedRepository;

    @Override
    public List<DeceasedDTO> findAll() {
        return deceasedRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DeceasedDTO findById(int id) {
        return deceasedRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public DeceasedDTO save(DeceasedDTO deceasedDTO) {
        Deceased deceased = convertToEntity(deceasedDTO);
        return convertToDTO(deceasedRepository.save(deceased));
    }

    @Override
    public void deleteById(int id) {
        deceasedRepository.deleteById(id);
    }

    private DeceasedDTO convertToDTO(Deceased deceased) {
        return DeceasedDTO.builder()
                .deceasedId(deceased.getDeceasedId())
                .deceasedStatus(deceased.isDeceasedStatus())
                .deceasedDateTime(deceased.getDeceasedDateTime())
                .build();
    }

    private Deceased convertToEntity(DeceasedDTO dto) {
        Deceased deceased = new Deceased();
        deceased.setDeceasedId(dto.getDeceasedId());
        deceased.setDeceasedStatus(dto.isDeceasedStatus());
        deceased.setDeceasedDateTime(dto.getDeceasedDateTime());
        return deceased;
    }
}
