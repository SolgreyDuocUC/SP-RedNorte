package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.dto.RegionDto;
import cl.rednorte.ms_centros.service.RegionService;
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

@Tag(name = "Regiones", description = "CRUD de Regiones para la distribución territorial")
@RestController
@RequestMapping("/api/v1/regions")
@RequiredArgsConstructor
public class RegionController {

    private final RegionService regionService;

    @Operation(summary = "Crear una nueva región")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Región creada con éxito"),
            @ApiResponse(responseCode = "400", description = "Validación fallida o nombre duplicado")
    })
    @PostMapping
    public ResponseEntity<RegionDto> create(@Valid @RequestBody RegionDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(regionService.create(dto));
    }

    @Operation(summary = "Listar todas las regiones")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    })
    @GetMapping
    public ResponseEntity<List<RegionDto>> findAll() {
        return ResponseEntity.ok(regionService.findAll());
    }

    @Operation(summary = "Obtener una región por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Región encontrada"),
            @ApiResponse(responseCode = "404", description = "Región no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<RegionDto> findById(
            @Parameter(description = "ID único de la región", example = "5")
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(regionService.findById(id));
    }

    @Operation(summary = "Buscar una región por su nombre exacto")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Región encontrada"),
            @ApiResponse(responseCode = "404", description = "Región no encontrada")
    })
    @GetMapping("/search")
    public ResponseEntity<RegionDto> findByName(
            @Parameter(description = "Nombre de la región a buscar", example = "Valparaíso")
            @RequestParam String name
    ) {
        return ResponseEntity.ok(regionService.findByName(name));
    }

    @Operation(summary = "Actualizar una región existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Región actualizada correctamente"),
            @ApiResponse(responseCode = "400", description = "Validación o datos incorrectos"),
            @ApiResponse(responseCode = "404", description = "Región no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<RegionDto> update(
            @Parameter(description = "ID de la región a modificar", example = "5")
            @PathVariable Long id,
            @Valid @RequestBody RegionDto dto
    ) {
        // Aseguramos que el ID de la URL se asigne al DTO antes de pasarlo al service
        dto.setId(id);
        return ResponseEntity.ok(regionService.update(dto));
    }

    @Operation(summary = "Eliminar una región")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Región eliminada correctamente (No Content)"),
            @ApiResponse(responseCode = "404", description = "Región no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID de la región a eliminar", example = "5")
            @PathVariable Long id
    ) {
        regionService.delete(id);
        return ResponseEntity.noContent().build(); // Retorna HTTP 204
    }
}
