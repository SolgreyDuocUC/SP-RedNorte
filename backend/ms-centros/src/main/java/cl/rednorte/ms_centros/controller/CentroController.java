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
    public ResponseEntity<String> crearUbicacion(@RequestBody Map<String, Object> payload) {
        String id = (String) payload.get("id");
        String organizationId = (String) payload.get("organization_id");
        String name = (String) payload.get("name");
        String status = (String) payload.get("status");
        List<String> specialties = (List<String>) payload.get("specialties");
        String type = (String) payload.get("type");
        String address = (String) payload.get("address");
        String commune = (String) payload.get("commune");
        String region = (String) payload.get("region");
        String phone = (String) payload.get("phone");
        String email = (String) payload.get("email");
        
        String locId = centroService.crearUbicacion(id, organizationId, name, status, specialties,
                type, address, commune, region, phone, email);
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

    @DeleteMapping("/locations/{id}")
    public ResponseEntity<Void> eliminarUbicacion(@PathVariable String id) {
        centroService.eliminarUbicacion(id);
        return ResponseEntity.noContent().build();
    }
}
