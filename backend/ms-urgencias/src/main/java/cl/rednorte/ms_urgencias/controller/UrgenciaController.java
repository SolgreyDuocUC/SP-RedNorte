package cl.rednorte.ms_urgencias.controller;

import cl.rednorte.ms_urgencias.service.UrgenciaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/urgencias")
public class UrgenciaController {

    private final UrgenciaService urgenciaService;

    public UrgenciaController(UrgenciaService urgenciaService) {
        this.urgenciaService = urgenciaService;
    }

    @PostMapping("/ingreso")
    public ResponseEntity<String> ingresoRecepcion(@RequestBody Map<String, String> payload) {
        String id = urgenciaService.registrarIngreso(payload.get("rut"), payload.get("motivo"));
        return ResponseEntity.ok("Paciente ingresado. ID Encuentro: " + id);
    }

    @PutMapping("/triage/{id}")
    public ResponseEntity<String> realizarTriage(@PathVariable String id, @RequestBody Map<String, Object> datosTriage) {
        urgenciaService.procesarTriage(id, datosTriage);
        return ResponseEntity.ok("Triage completado con éxito.");
    }

    @GetMapping("/espera/{rut}")
    public ResponseEntity<Map<String, Object>> consultarEspera(@PathVariable String rut) {
        int minutos = urgenciaService.calcularTiempoEspera(rut);
        return ResponseEntity.ok(Map.of("rut", rut, "tiempoEsperaMinutos", minutos));
    }

    @PutMapping("/rechazo")
    public ResponseEntity<String> rechazarAtencion(@RequestBody Map<String, String> payload) {
        urgenciaService.cancelarAtencion(payload.get("idEncuentro"), payload.get("rutConfirmacion"));
        return ResponseEntity.ok("Atención rechazada por el usuario de forma conforme.");
    }

    @GetMapping("/ficha/{id}")
    public ResponseEntity<Map<String, Object>> verFichaMedica(@PathVariable String id) {
        Map<String, Object> ficha = urgenciaService.obtenerFichaClinica(id);
        return ResponseEntity.ok(ficha);
    }

    @PutMapping("/alta/{id}")
    public ResponseEntity<String> darAltaMedica(@PathVariable String id, @RequestBody Map<String, String> payload) {
        urgenciaService.finalizarAtencion(id, payload.get("diagnostico"));
        return ResponseEntity.ok("Alta médica procesada correctamente.");
    }
}