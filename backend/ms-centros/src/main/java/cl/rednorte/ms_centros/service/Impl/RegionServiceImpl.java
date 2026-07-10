package cl.rednorte.ms_centros.service.Impl;

import cl.rednorte.ms_centros.dto.RegionDto;
import cl.rednorte.ms_centros.model.RegionEntity;
import cl.rednorte.ms_centros.repository.ComunaRepository;
import cl.rednorte.ms_centros.repository.RegionRepository;
import cl.rednorte.ms_centros.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements RegionService { // 💡 Obligatorio usar "implements"

    private final RegionRepository regionRepository;
    private final ComunaRepository comunaRepository;


    // ==========================================
    // MÉTODOS DE MAPEO (Traducción Entidad <-> DTO)
    // ==========================================

    private RegionDto toDto(RegionEntity region) {
        if (region == null) return null;

        return RegionDto.builder()
                .id(region.getId())
                .nombre(region.getNombre())
                .build();
    }

    private RegionEntity toEntity(RegionDto dto) {
        if (dto == null) return null;

        return RegionEntity.builder()
                .id(dto.getId())
                .nombre(dto.getNombre())
                .build();
    }

    // ==========================================
    // IMPLEMENTACIÓN DE LA LÓGICA DE NEGOCIO
    // ==========================================

    @Override
    public List<RegionDto> findAll() {
        // Trae de la BD, recorre la lista, transforma cada entidad a DTO y la junta en una lista nueva
        return regionRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RegionDto findById(Long id) {
        // Busca en la BD. Si no existe, lanza un error (Aquí podrías crear luego tu RegionNotFoundException)
        RegionEntity region = regionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Región no encontrada con el ID: " + id));
        return toDto(region);
    }

    @Override
    public RegionDto findByName(String name) {
        // Lógica personalizada: Busca usando el método que creamos en tu repositorio
        RegionEntity region = regionRepository.findByNombreIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Región no encontrada con el nombre: " + name));
        return toDto(region);
    }

    @Override
    public RegionDto create(RegionDto dto) {
        // REGLA DE NEGOCIO: Validar que el nombre no esté duplicado antes de guardar
        if (regionRepository.existsByNombreIgnoreCase(dto.getNombre())) {
            throw new RuntimeException("La región '" + dto.getNombre() + "' ya se encuentra registrada.");
        }

        RegionEntity region = toEntity(dto);
        RegionEntity saved = regionRepository.save(region);
        return toDto(saved);
    }

    @Override
    public RegionDto update(RegionDto dto) {
        // Validamos que el registro a actualizar realmente exista en la base de datos
        RegionEntity regionExistente = regionRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("No se puede actualizar. Región no encontrada."));

        // Actualizamos los datos permitidos
        regionExistente.setNombre(dto.getNombre());

        RegionEntity updated = regionRepository.save(regionExistente);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        if (!regionRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Región no encontrada.");
        }
        // Sin esta validación, borrar una región con comunas asociadas o
        // deja las comunas apuntando a una región inexistente (si la FK no
        // se hace cumplir) o revienta con un error de integridad referencial
        // sin explicación para el usuario.
        if (!comunaRepository.findByRegion_Id(id).isEmpty()) {
            throw new RuntimeException("No se puede eliminar la región: tiene comunas asociadas.");
        }
        regionRepository.deleteById(id);
    }
}