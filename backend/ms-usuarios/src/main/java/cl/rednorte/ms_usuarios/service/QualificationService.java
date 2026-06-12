package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.QualificationDTO;
import java.util.List;

public interface QualificationService {
    List<QualificationDTO> findAll();
    QualificationDTO save(QualificationDTO dto);
}
