package cl.rednorte.ms_centros.excptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 1. Captura errores genéricos de lógica de negocio (como los "throw new RuntimeException" que pusimos en tus servicios)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", OffsetDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Bad Request");
        response.put("message", ex.getMessage()); // Aquí viaja el texto que pusiste en el Service

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // 2. Para cuando usemos validaciones con @Valid en los controladores (ej: @NotNull, @Size en los DTOs)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult().getFieldErrors()
                .forEach(fe -> fieldErrors.put(fe.getField(), fe.getDefaultMessage()));

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", OffsetDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Validación fallida");
        response.put("errors", fieldErrors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // 3. Manejo estándar para excepciones nativas de Spring basadas en ResponseStatusException
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", OffsetDateTime.now());
        response.put("status", ex.getStatusCode().value());
        response.put("error", ex.getStatusCode().toString());
        response.put("message", ex.getReason());

        return new ResponseEntity<>(response, ex.getStatusCode());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage())); // Devuelve un hermoso 404
    }

    @ExceptionHandler(CentroNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCentroNotFound(CentroNotFoundException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", java.time.OffsetDateTime.now());
        response.put("status", org.springframework.http.HttpStatus.NOT_FOUND.value());
        response.put("error", "Recurso no encontrado");
        response.put("message", ex.getMessage());

        return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND).body(response);
    }

}
