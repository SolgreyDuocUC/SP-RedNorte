package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.DeceasedDTO;
import java.util.List;

public interface DeceasedService {
    List<DeceasedDTO> findAll();
    DeceasedDTO findById(int id);
    DeceasedDTO save(DeceasedDTO deceasedDTO);
    void deleteById(int id);
}
