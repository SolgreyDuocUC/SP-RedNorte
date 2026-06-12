package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.service.CentroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CentroController {

    private final CentroService centroService;

    public CentroController(CentroService centroService) {
        this.centroService = centroService;
    }

    // ==========================================
    // ORGANIZACIONES
    // ==========================================

    @PostMapping("/organizations")
    public ResponseEntity<String> crearOrganizacion(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        String name = payload.get("name");
        String orgId = centroService.crearOrganizacion(id, name);
        return ResponseEntity.ok("Organización creada exitosamente con ID: " + orgId);
    }

    @GetMapping("/organizations/{id}")
    public ResponseEntity<Map<String, Object>> obtenerOrganizacion(@PathVariable String id) {
        return ResponseEntity.ok(centroService.obtenerOrganizacion(id));
    }

    @GetMapping("/organizations")
    public ResponseEntity<List<Map<String, Object>>> listarOrganizaciones() {
        return ResponseEntity.ok(centroService.listarOrganizaciones());
    }

    // ==========================================
    // UBICACIONES / CENTROS (LOCATIONS)
    // ==========================================

    @PostMapping("/locations")
    public ResponseEntity<String> crearUbicacion(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        String organizationId = payload.get("organization_id");
        String name = payload.get("name");
        String status = payload.get("status");
        
        String locId = centroService.crearUbicacion(id, organizationId, name, status);
        return ResponseEntity.ok("Ubicación creada exitosamente con ID: " + locId);
    }

    @GetMapping("/locations/{id}")
    public ResponseEntity<Map<String, Object>> obtenerUbicacion(@PathVariable String id) {
        return ResponseEntity.ok(centroService.obtenerUbicacion(id));
    }

    @GetMapping("/locations")
    public ResponseEntity<List<Map<String, Object>>> listarUbicaciones() {
        return ResponseEntity.ok(centroService.listarUbicaciones());
    }
}
