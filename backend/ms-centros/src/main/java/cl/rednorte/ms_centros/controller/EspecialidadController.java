package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.dto.EspecialidadRequestDto;
import cl.rednorte.ms_centros.dto.EspecialidadResponseDto;
import cl.rednorte.ms_centros.service.EspecialidadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Especialidades Médicas", description = "CRUD para la gestión del catálogo estandarizado de especialidades")
@RestController
@RequestMapping("/api/v1/specialties")
@RequiredArgsConstructor
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    @Operation(summary = "Crear una nueva especialidad en el catálogo")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Especialidad creada con éxito"),
            @ApiResponse(responseCode = "400", description = "Validación fallida de los datos de entrada"),
            @ApiResponse(responseCode = "409", description = "La especialidad ya existe en el catálogo")
    })
    @PostMapping
    public ResponseEntity<EspecialidadResponseDto> crear(
            @Valid @RequestBody EspecialidadRequestDto dto
    ) {
        EspecialidadResponseDto resultado = especialidadService.crearEspecialidad(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
    }

    @Operation(summary = "Listar todas las especialidades registradas")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Catálogo obtenido correctamente")
    })
    @GetMapping
    public ResponseEntity<List<EspecialidadResponseDto>> listarTodas() {
        return ResponseEntity.ok(especialidadService.obtenerTodas());
    }

    @Operation(summary = "Obtener detalles de una especialidad por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Especialidad encontrada"),
            @ApiResponse(responseCode = "404", description = "Especialidad no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<EspecialidadResponseDto> obtenerPorId(
            @Parameter(description = "ID único de la especialidad", example = "1")
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(especialidadService.obtenerPorId(id));
    }

    @Operation(summary = "Actualizar una especialidad existente por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Especialidad actualizada correctamente"),
            @ApiResponse(responseCode = "400", description = "Validación fallida de los datos enviados"),
            @ApiResponse(responseCode = "404", description = "Especialidad no encontrada"),
            @ApiResponse(responseCode = "409", description = "El nuevo nombre ya está ocupado por otra especialidad")
    })
    @PutMapping("/{id}")
    public ResponseEntity<EspecialidadResponseDto> actualizar(
            @Parameter(description = "ID de la especialidad a actualizar", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody EspecialidadRequestDto dto
    ) {
        EspecialidadResponseDto resultado = especialidadService.actualizarEspecialidad(id, dto);
        return ResponseEntity.ok(resultado);
    }

    @Operation(summary = "Eliminar una especialidad del catálogo por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Especialidad eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Especialidad no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @Parameter(description = "ID de la especialidad a eliminar", example = "1")
            @PathVariable Long id
    ) {
        especialidadService.eliminarEspecialidad(id);
        return ResponseEntity.noContent().build(); // Retorna HTTP 204 No Content
    }
}