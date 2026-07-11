package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.dto.CentrosDto;
import cl.rednorte.ms_centros.service.CentroService;
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

@Tag(name = "Centros Médicos", description = "CRUD para la gestión de centros de atención y clínicas")
@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor // Adiós constructor manual, Lombok lo hace por nosotros
public class CentroController {

    private final CentroService centroService;
    private final cl.rednorte.ms_centros.config.FlywaySeedRunner seederRunner;

    @Operation(summary = "Ejecutar manualmente las migraciones de poblado (Flyway) pendientes")
    @RequestMapping(value = "/seed", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> runSeedScript() {
        String result = seederRunner.runMigrations();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Crear o actualizar un centro médico")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Centro médico procesado con éxito"),
            @ApiResponse(responseCode = "400", description = "Validación fallida de los datos de entrada"),
            @ApiResponse(responseCode = "404", description = "Comuna asociada no encontrada")
    })
    @PostMapping
    public ResponseEntity<CentrosDto> guardarOActualizar(@Valid @RequestBody CentrosDto dto) {
        // Tu service maneja internamente si es creación o actualización basándose en si el ID es nulo o no
        CentrosDto resultado = centroService.guardarOActualizarCentro(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
    }

    @Operation(summary = "Listar todos los centros médicos registrados")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    })
    @GetMapping
    public ResponseEntity<List<CentrosDto>> listarTodos() {
        return ResponseEntity.ok(centroService.listarUbicaciones());
    }

    @Operation(summary = "Obtener detalles de un centro médico por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Centro médico encontrado"),
            @ApiResponse(responseCode = "404", description = "Centro médico no encontrado (CentroNotFoundException)")
    })
    @GetMapping("/{id}")
    public ResponseEntity<CentrosDto> obtenerPorId(
            @Parameter(description = "ID único del centro médico", example = "1")
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(centroService.obtenerUbicacion(id));
    }

    @Operation(summary = "Eliminar un centro médico por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Centro médico eliminado correctamente"),
            @ApiResponse(responseCode = "404", description = "Centro médico no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @Parameter(description = "ID del centro médico a eliminar", example = "1")
            @PathVariable Long id
    ) {
        centroService.eliminarUbicacion(id);
        return ResponseEntity.noContent().build(); // Retorna el estándar HTTP 204 No Content
    }
}