package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.dto.ComunaDto;
import cl.rednorte.ms_centros.service.ComunaService;
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

@Tag(name = "Comunas", description = "CRUD de Comunas y filtros territoriales en cascada")
@RestController
@RequestMapping("/api/v1/communes")
@RequiredArgsConstructor
public class ComunaController {

    private final ComunaService comunaService;

    @Operation(summary = "Crear una nueva comuna")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Comuna creada con éxito"),
            @ApiResponse(responseCode = "400", description = "Validación fallida o comuna ya existe en la región")
    })
    @PostMapping
    public ResponseEntity<ComunaDto> create(@Valid @RequestBody ComunaDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(comunaService.createComuna(dto));
    }

    @Operation(summary = "Listar todas las comunas")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    })
    @GetMapping
    public ResponseEntity<List<ComunaDto>> findAll() {
        return ResponseEntity.ok(comunaService.getComunas());
    }

    @Operation(summary = "Obtener una comuna por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comuna encontrada"),
            @ApiResponse(responseCode = "404", description = "Comuna no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ComunaDto> findById(
            @Parameter(description = "ID único de la comuna", example = "45")
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(comunaService.getComunaById(id));
    }

    @Operation(summary = "Buscar comunas por filtros (nombre y/o región)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Búsqueda procesada de forma correcta"),
            @ApiResponse(responseCode = "404", description = "Comuna no encontrada con los parámetros dados")
    })
    @GetMapping("/search")
    public ResponseEntity<ComunaDto> search(
            @Parameter(description = "Nombre de la comuna", example = "Villa Alemana")
            @RequestParam String name,
            @Parameter(description = "ID opcional de la región para búsqueda exacta", example = "5")
            @RequestParam(required = false) Long regionId
    ) {
        // Si el frontend envía el regionId, ejecutamos la búsqueda cruzada exacta
        if (regionId != null) {
            return ResponseEntity.ok(comunaService.getComunaByNombreAndIdRegion(name, regionId));
        }
        // Si no envía región, busca solo por el texto del nombre
        return ResponseEntity.ok(comunaService.getComunaByNombre(name));
    }

    @Operation(summary = "Actualizar una comuna existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comuna actualizada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "404", description = "Comuna o Región asociada no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ComunaDto> update(
            @Parameter(description = "ID de la comuna a modificar", example = "45")
            @PathVariable Long id,
            @Valid @RequestBody ComunaDto dto) {
        dto.setId(id); // Seteamos el ID del PathParam para asegurar consistencia
        return ResponseEntity.ok(comunaService.updateComuna(dto));
    }

    @Operation(summary = "Eliminar una comuna")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Comuna eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Comuna no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID de la comuna a eliminar", example = "45")
            @PathVariable Long id
    ) {
        // Construimos el DTO mínimo que espera tu firma del service
        ComunaDto dtoAEliminar = ComunaDto.builder().id(id).build();
        comunaService.deleteComuna(dtoAEliminar);

        return ResponseEntity.noContent().build(); // Retorna HTTP 204 No Content
    }
}
