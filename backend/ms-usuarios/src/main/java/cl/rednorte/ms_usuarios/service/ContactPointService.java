package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.ContactDTO;
import java.util.List;

public interface ContactPointService {
    List<ContactDTO> findAll();
    ContactDTO save(ContactDTO dto);
}
