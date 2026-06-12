package cl.rednorte.ms_reservas.service;

import cl.rednorte.ms_reservas.dto.SlotDTO;

import java.util.List;
import java.util.Optional;

public interface SlotService {

    SlotDTO create(SlotDTO dto);

    Optional<SlotDTO> findById(String id);

    List<SlotDTO> findAll();

    List<SlotDTO> findAvailableBySpecialty(String specialty);

    List<SlotDTO> findByPractitionerId(String practitionerId);

    SlotDTO update(String id, SlotDTO dto);

    void delete(String id);
}
