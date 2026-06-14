package cl.rednorte.ms_usuarios.security;

import cl.rednorte.ms_usuarios.model.UserEntity;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${application.security.jwt.secret-key:63e00738b0fb4a40926cbbfbeee2c33ea30db4d7b02162e05d90b2c7699276df}")
    private String secretKey;

    private final long ACCESS_EXPIRATION = 1000 * 60 * 24;
    private final long REFRESH_EXPIRATION = 1000L * 60 * 60 * 24 * 7; // 7 días

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // TOKENS

    public String generateToken(UserEntity user) {

        // Convertimos roles a authorities
        var authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .claim("id", user.getId().toString())
                .claim("email", user.getEmail())
                .claim("username", user.getRun())
                .claim("authorities", authorities)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(UserEntity user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // EXTRAER CLAIMS

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // VALIDACIÓN

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
