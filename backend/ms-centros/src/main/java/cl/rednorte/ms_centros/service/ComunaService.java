package cl.rednorte.ms_centros.service;

import cl.rednorte.ms_centros.dto.ComunaDto;

import java.util.List;

public interface ComunaService {

    List<ComunaDto> getComunas();

    ComunaDto getComunaById(Long id);

    ComunaDto getComunaByNombre(String nombre);

    ComunaDto getComunaByNombreAndIdRegion(String nombre, Long idRegion);

    ComunaDto createComuna(ComunaDto comunaDto);

    ComunaDto updateComuna(ComunaDto comunaDto);

    void deleteComuna(ComunaDto comunaDto);

}
