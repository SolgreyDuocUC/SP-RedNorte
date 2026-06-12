package cl.rednorte.ms_usuarios.service;

import cl.rednorte.ms_usuarios.dto.AddressDTO;
import java.util.List;

public interface AddressService {
    List<AddressDTO> findAll();
    AddressDTO save(AddressDTO dto);
}
