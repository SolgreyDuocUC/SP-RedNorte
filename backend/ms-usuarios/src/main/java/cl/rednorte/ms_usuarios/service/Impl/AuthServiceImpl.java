package cl.rednorte.ms_usuarios.service.Impl;

import cl.rednorte.ms_usuarios.config.JwtProperties;
import cl.rednorte.ms_usuarios.dto.auth.LoginRequestDTO;
import cl.rednorte.ms_usuarios.dto.auth.LoginResponseDTO;
import cl.rednorte.ms_usuarios.model.RoleEntity;
import cl.rednorte.ms_usuarios.model.UserEntity;
import cl.rednorte.ms_usuarios.repository.UserRepository;
import cl.rednorte.ms_usuarios.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final String INVALID_CREDENTIALS_MESSAGE = "RUN o contraseña incorrectos";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private final JwtProperties jwtProperties;

    @Override
    @Transactional(readOnly = true)
    public LoginResponseDTO login(LoginRequestDTO request) {
        UserEntity user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new BadCredentialsException(INVALID_CREDENTIALS_MESSAGE));

        if (!user.isEnabled()) {
            throw new DisabledException(INVALID_CREDENTIALS_MESSAGE);
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException(INVALID_CREDENTIALS_MESSAGE);
        }

        Set<String> roleNames = user.getRoles().stream()
                .map(RoleEntity::getName)
                .collect(Collectors.toSet());

        String token = buildToken(user, roleNames);

        return new LoginResponseDTO(
                token,
                new LoginResponseDTO.UserInfo(user.getId(), user.getUsername(), user.getEmail(), roleNames)
        );
    }

    private String buildToken(UserEntity user, Set<String> roles) {
        Instant now = Instant.now();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("ms-usuarios")
                .issuedAt(now)
                .expiresAt(now.plus(jwtProperties.getExpiration()))
                .subject(user.getUsername())
                .claim("uid", user.getId().toString())
                .claim("email", user.getEmail())
                .claim("roles", roles)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
