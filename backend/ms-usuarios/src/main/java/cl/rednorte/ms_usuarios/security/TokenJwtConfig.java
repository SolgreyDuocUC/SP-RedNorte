package cl.rednorte.ms_usuarios.security;

import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

public class TokenJwtConfig {

    public static final String SECRET = "63e00738b0fb4a40926cbbfbeee2c33ea30db4d7b02162e05d90b2c7699276df";

    public static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static final String JWT_TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String CONTENT_TYPE = "application/json";

}
