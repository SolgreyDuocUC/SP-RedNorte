package cl.rednorte.ms_centros.service;

import cl.rednorte.ms_centros.dto.RegionDto;

import java.util.List;

public interface RegionService {

    //Buscar todas las regiones
    List<RegionDto> findAll();

    //Buscar por id
    RegionDto findById(Long id);

    //Buscar por nombre, ya que la region debería ser única
    RegionDto findByName(String name);

    //Crear una region para manejo inicial de la base de datos
    RegionDto create(RegionDto dto);

    //Actualizar datos de la región si son necesarios por cambios políticos o territoriales
    RegionDto update(RegionDto dto);

    void delete(Long id);

}
