package cl.rednorte.ms_paciente.config;

import cl.rednorte.ms_paciente.model.PatientEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    private final long ACCESS_EXPIRATION = 1000 * 60 * 24; // 24 minutos
    private final long REFRESH_EXPIRATION = 1000L * 60 * 60 * 24 * 7; // 7 días

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(PatientEntity patient) {
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_PATIENT"));

        return Jwts.builder()
                .setSubject(patient.getIdentifierValue())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .claim("patient_id", patient.getId())
                .claim("authorities", authorities)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(PatientEntity patient) {
        return Jwts.builder()
                .setSubject(patient.getIdentifierValue())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
