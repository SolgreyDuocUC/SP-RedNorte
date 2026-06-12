package cl.rednorte.ms_usuarios.controller.Auth;

import cl.rednorte.ms_usuarios.dto.AuthResponse;
import cl.rednorte.ms_usuarios.dto.LoginRequest;
import cl.rednorte.ms_usuarios.dto.UserDTO;
import cl.rednorte.ms_usuarios.model.UserEntity;
import cl.rednorte.ms_usuarios.security.JwtUtil;
import cl.rednorte.ms_usuarios.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO dto) {
        UserDTO userDTO = userService.save(dto);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        UserEntity user = userService.findEntityByEmail(request.getEmail());

        if (!userService.matchesPassword(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String accessToken = jwtUtil.generateToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        List<String> roles = user.getRoles().stream()
                .map(r -> r.getName().replace("ROLE_", ""))
                .toList();

        return ResponseEntity.ok(
                new AuthResponse(
                        user.getId(),
                        user.getEmail(),
                        roles,
                        accessToken,
                        refreshToken
                )
        );
    }
}
