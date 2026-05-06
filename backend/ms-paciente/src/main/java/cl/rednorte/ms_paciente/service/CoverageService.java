package cl.rednorte.ms_paciente.service;

import cl.rednorte.ms_paciente.dto.CoverageDTO;

import java.util.List;

public interface CoverageService {

    List<CoverageDTO> findAll();

    CoverageDTO create(CoverageDTO dto);
}
