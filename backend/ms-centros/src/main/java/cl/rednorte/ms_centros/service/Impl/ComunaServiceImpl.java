package cl.rednorte.ms_centros.service.Impl;

import cl.rednorte.ms_centros.dto.ComunaDto;
import cl.rednorte.ms_centros.model.ComunaEntity;
import cl.rednorte.ms_centros.model.RegionEntity;
import cl.rednorte.ms_centros.repository.ComunaRepository;
import cl.rednorte.ms_centros.repository.RegionRepository;
import cl.rednorte.ms_centros.service.ComunaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // 💡 Reemplaza @Autowired usando la mejor práctica de constructor
public class ComunaServiceImpl implements ComunaService {

    private final ComunaRepository comunaRepository;
    private final RegionRepository regionRepository; // Necesario para validar e inyectar la región

    // ==========================================
    // MÉTODOS DE MAPEO (Traducción Entidad <-> DTO)
    // ==========================================

    private ComunaDto toDto(ComunaEntity comuna) {
        if (comuna == null) return null;

        return ComunaDto.builder()
                .id(comuna.getId())
                .nombre(comuna.getNombre())
                // Navegamos a la región para extraer solo su ID
                .idRegion(comuna.getRegion() != null ? comuna.getRegion().getId() : null)
                .build();
    }

    private ComunaEntity toEntity(ComunaDto dto) {
        if (dto == null) return null;

        // Buscamos la región real en la base de datos para asegurar la consistencia del modelo
        RegionEntity region = regionRepository.findById(dto.getIdRegion())
                .orElseThrow(() -> new RuntimeException("No se puede mapear la comuna. Región no encontrada con el ID: " + dto.getIdRegion()));

        return ComunaEntity.builder()
                .id(dto.getId())
                .nombre(dto.getNombre())
                .region(region)
                .build();
    }

    // IMPLEMENTACIÓN DE LA LÓGICA DE NEGOCIO

    @Override
    public List<ComunaDto> getComunas() {
        return comunaRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ComunaDto getComunaById(Long id) {
        ComunaEntity comuna = comunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comuna no encontrada con el ID: " + id));
        return toDto(comuna);
    }

    @Override
    public ComunaDto getComunaByNombre(String nombre) {
        ComunaEntity comuna = comunaRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .findFirst() // Al poder haber nombres similares, tomamos el primero o puedes adaptar tu repositorio a Optional
                .orElseThrow(() -> new RuntimeException("Comuna no encontrada con el nombre: " + nombre));
        return toDto(comuna);
    }

    @Override
    public ComunaDto getComunaByNombreAndIdRegion(String nombre, Long idRegion) {
        // Optional<ComunaEntity> findByNombreIgnoreCaseAndRegion_Id(String nombre, Long idRegion);
        ComunaEntity comuna = comunaRepository.findByNombreIgnoreCaseAndRegion_Id(nombre, idRegion)
                .orElseThrow(() -> new RuntimeException("No se encontró la comuna '" + nombre + "' en la región especificada."));
        return toDto(comuna);
    }

    @Override
    public ComunaDto createComuna(ComunaDto comunaDto) {
        // Regla de Negocio: Evitar duplicar comunas que pertenezcan a la misma región
        if (comunaRepository.existsByNombreIgnoreCaseAndRegion_Id(comunaDto.getNombre(), comunaDto.getIdRegion())) {
            throw new RuntimeException("La comuna '" + comunaDto.getNombre() + "' ya existe en esta región.");
        }

        ComunaEntity comuna = toEntity(comunaDto);
        ComunaEntity saved = comunaRepository.save(comuna);
        return toDto(saved);
    }

    @Override
    public ComunaDto updateComuna(ComunaDto comunaDto) {
        ComunaEntity comunaExistente = comunaRepository.findById(comunaDto.getId())
                .orElseThrow(() -> new RuntimeException("No se puede actualizar. Comuna no encontrada."));

        // Buscamos la nueva región si es que cambió de ID territorial
        RegionEntity nuevaRegion = regionRepository.findById(comunaDto.getIdRegion())
                .orElseThrow(() -> new RuntimeException("Región no encontrada para la actualización de la comuna."));

        comunaExistente.setNombre(comunaDto.getNombre());
        comunaExistente.setRegion(nuevaRegion);

        ComunaEntity updated = comunaRepository.save(comunaExistente);
        return toDto(updated);
    }

    @Override
    public void deleteComuna(ComunaDto comunaDto) {
        // Tu interfaz solicita borrar pasando el DTO completo, por lo que validamos usando su ID interno
        if (comunaDto == null || !comunaRepository.existsById(comunaDto.getId())) {
            throw new RuntimeException("No se puede eliminar. Comuna no encontrada.");
        }
        comunaRepository.deleteById(comunaDto.getId());
    }
}