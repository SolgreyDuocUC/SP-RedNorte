package cl.rednorte.ms_usuarios.controller;

import cl.rednorte.ms_usuarios.dto.PractitionerDTO;
import cl.rednorte.ms_usuarios.service.PractitionerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v2/practitioner")
@RequiredArgsConstructor
@Tag(name = "Especialistas RedNorte")
public class PractitionerController {

    private final PractitionerService practitionerService;

    @Operation(summary = "Listar todos los especialistas", description = "Obtiene un listado completo de los especialistas registrados")
    @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    @GetMapping
    public ResponseEntity<List<PractitionerDTO>> findAll() {
        return ResponseEntity.ok(practitionerService.findAll());
    }

    @Operation(summary = "Buscar un especialista por su numero de ID", description = "Obtiene un especialista buscando por el numero de id registrado")
    @ApiResponse(responseCode = "200", description = "Especialista obtenido correctamente")
    @GetMapping("/{id}")
    public ResponseEntity<PractitionerDTO> findById(@PathVariable int id) {
        return ResponseEntity.ok(practitionerService.findById(id).orElse(null));
    }

    @Operation(summary = "Buscar un especialista por su RUN", description = "Obtiene un especialista por el RUN")
    @ApiResponse(responseCode = "200", description = "Especialista encontrado")
    @GetMapping("/run/{run}")
    public ResponseEntity<PractitionerDTO> findByRun(@PathVariable String run) {
        return practitionerService.findByRun(run)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Buscar especialistas por nombre", description = "Obtiene especialistas cuyo primer nombre coincida (parcial, case-insensitive)")
    @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    @GetMapping("/name/{name}")
    public ResponseEntity<List<PractitionerDTO>> findByName(@PathVariable String name) {
        return ResponseEntity.ok(practitionerService.findByName(name));
    }

    @Operation(summary = "Crear un nuevo especialista", description = "Registra un nuevo especialista")
    @ApiResponse(responseCode = "201", description = "Especialista creado correctamente")
    @PostMapping
    public ResponseEntity<PractitionerDTO> save(@RequestBody PractitionerDTO practitionerDTO) {
        return ResponseEntity.ok(practitionerService.save(practitionerDTO));
    }

    @Operation(summary = "Actualizar un especialista", description = "Actualiza un especialista registrado")
    @ApiResponse(responseCode = "200", description = "Especialista actualizado correctamente")
    @PutMapping("/{id}")
    public ResponseEntity<PractitionerDTO> update(@PathVariable int id, @RequestBody PractitionerDTO practitionerDTO) {
        return ResponseEntity.ok(practitionerService.update(id, practitionerDTO));
    }

    @Operation(summary = "Eliminar un especialista", description = "Elimina un especialista registrado")
    @ApiResponse(responseCode = "200", description = "Especialista eliminado correctamente")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        practitionerService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
