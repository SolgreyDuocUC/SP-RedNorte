package cl.rednorte.ms_centros.service;

import cl.rednorte.ms_centros.dto.CentrosDto;
import java.util.List;

public interface CentroService {

    List<CentrosDto> listarUbicaciones();

    CentrosDto obtenerUbicacion(Long id);

    CentrosDto guardarOActualizarCentro(CentrosDto dto);

    void eliminarUbicacion(Long id);

}