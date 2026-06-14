package cl.rednorte.ms_centros.service.Impl;

import cl.rednorte.ms_centros.dto.CentrosDto;
import cl.rednorte.ms_centros.excptions.CentroNotFoundException;
import cl.rednorte.ms_centros.model.CentroEntity;
import cl.rednorte.ms_centros.model.ComunaEntity;
import cl.rednorte.ms_centros.repository.CentroRepository;
import cl.rednorte.ms_centros.repository.ComunaRepository;
import cl.rednorte.ms_centros.service.CentroService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Inyección automática por constructor usando Lombok
public class CentroServiceImpl implements CentroService {

    private final CentroRepository centroRepository;
    private final ComunaRepository comunaRepository; // Para enlazar la comuna real al centro

    // ==========================================
    // MÉTODOS DE MAPEO (Traducción Entidad <-> DTO)
    // ==========================================

    private CentrosDto toDto(CentroEntity c) {
        if (c == null) return null;

        return CentrosDto.builder()
                .id(c.getId())
                .name(c.getName())
                .address(c.getAddress())
                .phone(c.getPhone())
                .email(c.getEmail())
                .status(c.getStatus())
                .specialties(c.getSpecialties())
                .comuna(c.getComuna() != null ?
                        new CentrosDto.ComunaResponseDto(c.getComuna().getId(), c.getComuna().getNombre()) : null)
                .build();
    }

    // ==========================================
    // IMPLEMENTACIÓN DE LA LÓGICA DE NEGOCIO
    // ==========================================

    @Override
    public List<CentrosDto> listarUbicaciones() {
        return centroRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CentrosDto obtenerUbicacion(Long id) {
        CentroEntity c = centroRepository.findById(id)
                .orElseThrow(() -> new CentroNotFoundException(id)); // Tu excepción personalizada
        return toDto(c);
    }

    @Override
    public CentrosDto guardarOActualizarCentro(CentrosDto dto) {
        CentroEntity centro;

        // Si viene un ID válido, validamos existencia para actualizar
        if (dto.getId() != null) {
            centro = centroRepository.findById(dto.getId())
                    .orElseThrow(() -> new CentroNotFoundException(dto.getId()));
        } else {
            // Si no viene ID, creamos una nueva instancia vacía
            centro = new CentroEntity();
        }

        // Mapeamos los datos del DTO a la Entidad
        centro.setName(dto.getName());
        centro.setAddress(dto.getAddress());
        centro.setPhone(dto.getPhone());
        centro.setEmail(dto.getEmail());
        centro.setStatus(dto.getStatus() != null ? dto.getStatus() : "active");
        centro.setSpecialties(dto.getSpecialties());

        // Buscamos y asignamos la Comuna relacional usando el ID que viene del frontend
        if (dto.getComuna() != null && dto.getComuna().getId() != null) {
            ComunaEntity comunaReal = comunaRepository.findById(dto.getComuna().getId())
                    .orElseThrow(() -> new RuntimeException("No se puede guardar el centro. La comuna especificada no existe."));
            centro.setComuna(comunaReal);
        }

        CentroEntity saved = centroRepository.save(centro);
        return toDto(saved);
    }

    @Override
    public void eliminarUbicacion(Long id) {
        if (!centroRepository.existsById(id)) {
            throw new CentroNotFoundException(id);
        }
        centroRepository.deleteById(id);
    }
}