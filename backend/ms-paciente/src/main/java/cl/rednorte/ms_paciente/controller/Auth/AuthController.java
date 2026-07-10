package cl.rednorte.ms_paciente.controller.Auth;

import cl.rednorte.ms_paciente.config.JwtUtil;
import cl.rednorte.ms_paciente.dto.AuthResponse;
import cl.rednorte.ms_paciente.dto.LoginRequest;
import cl.rednorte.ms_paciente.dto.PatientDTO;
import cl.rednorte.ms_paciente.model.PatientEntity;
import cl.rednorte.ms_paciente.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patients/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PatientService patientService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<PatientDTO> register(@RequestBody PatientDTO dto) {
        PatientDTO patientDTO = patientService.create(dto);
        return ResponseEntity.ok(patientDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        // Asumimos que el identifierValue (ej. RUN) es el usuario
        Optional<PatientEntity> patientOpt = patientService.findEntityByIdentifier("RUN", request.getIdentifierValue());
        
        if (patientOpt.isEmpty()) {
            // Intenta buscar asumiendo que pueda ser PASSPORT si no encontró por RUN, 
            // o idealmente el LoginRequest debería mandar el tipo. 
            // Por simplicidad, buscaremos directamente por valor si tuviéramos un método para ello,
            // pero findEntityByIdentifier requiere el tipo. 
            // Como fallback buscaremos por RUN y luego PASSPORT.
            patientOpt = patientService.findEntityByIdentifier("PASSPORT", request.getIdentifierValue());
        }

        if (patientOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        PatientEntity patient = patientOpt.get();

        // Un paciente inactivo (soft-delete) no debe poder autenticarse: la
        // desactivación era puramente cosmética porque este chequeo faltaba,
        // dejando credenciales de pacientes "eliminados" funcionando para
        // siempre.
        if (Boolean.FALSE.equals(patient.getActive())) {
            return ResponseEntity.status(401).build();
        }

        if (!patientService.matchesPassword(request.getPassword(), patient.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String accessToken = jwtUtil.generateToken(patient);
        String refreshToken = jwtUtil.generateRefreshToken(patient);

        return ResponseEntity.ok(
                new AuthResponse(
                        patient.getId(),
                        patient.getIdentifierValue(),
                        List.of("PATIENT"),
                        accessToken,
                        refreshToken
                )
        );
    }
}
