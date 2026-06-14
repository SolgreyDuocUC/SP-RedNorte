package cl.rednorte.ms_centros.service;

import cl.rednorte.ms_centros.dto.EspecialidadRequestDto;
import cl.rednorte.ms_centros.dto.EspecialidadResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EspecialidadService {

    EspecialidadResponseDto crearEspecialidad(EspecialidadRequestDto request);

    List<EspecialidadResponseDto> obtenerTodas();

    EspecialidadResponseDto obtenerPorId(Long id);

    @Transactional
    EspecialidadResponseDto actualizarEspecialidad(Long id, EspecialidadRequestDto request);

    void eliminarEspecialidad(Long id);
}
