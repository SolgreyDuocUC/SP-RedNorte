package cl.rednorte.ms_centros.service.Impl;

import cl.rednorte.ms_centros.dto.EspecialidadRequestDto;
import cl.rednorte.ms_centros.dto.EspecialidadResponseDto;
import cl.rednorte.ms_centros.excptions.DuplicateResourceException;
import cl.rednorte.ms_centros.excptions.ResourceNotFoundException;
import cl.rednorte.ms_centros.model.EspecialidadEntity;
import cl.rednorte.ms_centros.repository.EspecialidadRepository;
import cl.rednorte.ms_centros.service.EspecialidadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EspecialidadServiceImpl implements EspecialidadService {

    private final EspecialidadRepository especialidadRepository;

    @Override
    @Transactional
    public EspecialidadResponseDto crearEspecialidad(EspecialidadRequestDto request) {
        // CONTROL: Evitar duplicados ignorando espacios vacíos extraños y estandarizando texto
        String nombreEstandarizado = request.getNombreEspecialidad().trim();

        especialidadRepository.findByNombreEspecialidad(nombreEstandarizado)
                .ifPresent(e -> {
                    throw new DuplicateResourceException(
                            String.format("La especialidad '%s' ya existe en el catálogo estandarizado.", nombreEstandarizado)
                    );
                });

        EspecialidadEntity nuevaEspecialidad = new EspecialidadEntity();
        nuevaEspecialidad.setNombreEspecialidad(nombreEstandarizado);
        nuevaEspecialidad.setDescripcionEspecialidad(request.getDescripcionEspecialidad().trim());

        EspecialidadEntity guardada = especialidadRepository.save(nuevaEspecialidad);
        return mapearADto(guardada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EspecialidadResponseDto> obtenerTodas() {
        return especialidadRepository.findAll().stream()
                .map(this::mapearADto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EspecialidadResponseDto obtenerPorId(Long id) { // <-- Corregido el typo aquí
        EspecialidadEntity entidad = especialidadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró la especialidad con ID: " + id));
        return mapearADto(entidad);
    }

    @Transactional
    @Override
    public EspecialidadResponseDto actualizarEspecialidad(Long id, EspecialidadRequestDto request) {
        EspecialidadEntity entidadExistente = especialidadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se puede actualizar. No existe la especialidad con ID: " + id));

        String nuevoNombre = request.getNombreEspecialidad().trim();

        if (!entidadExistente.getNombreEspecialidad().equalsIgnoreCase(nuevoNombre)) {
            especialidadRepository.findByNombreEspecialidad(nuevoNombre)
                    .ifPresent(e -> {
                        throw new DuplicateResourceException(
                                String.format("No se puede actualizar: El nombre '%s' ya está siendo usado por otra especialidad.", nuevoNombre)
                        );
                    });
            entidadExistente.setNombreEspecialidad(nuevoNombre);
        }

        entidadExistente.setDescripcionEspecialidad(request.getDescripcionEspecialidad().trim());
        EspecialidadEntity actualizada = especialidadRepository.save(entidadExistente);

        return mapearADto(actualizada);
    }

    @Override
    @Transactional
    public void eliminarEspecialidad(Long id) {
        // CONTROL: Validar existencia antes de lanzar la eliminación para evitar fallos silenciosos
        if (!especialidadRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se puede eliminar. No existe la especialidad con ID: " + id);
        }
        especialidadRepository.deleteById(id);
    }

    // Métodos de mapeo internos (Mappers helpeadores)
    private EspecialidadResponseDto mapearADto(EspecialidadEntity entidad) {
        return new EspecialidadResponseDto(
                entidad.getIdEspecialidad(),
                entidad.getNombreEspecialidad(),
                entidad.getDescripcionEspecialidad()
        );
    }
}
