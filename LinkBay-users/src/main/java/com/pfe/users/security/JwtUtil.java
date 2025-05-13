package com.pfe.users.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.pfe.users.Utilisateur;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    // Convert the secret string to a SecretKey
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Utilisateur utilisateur) {
        return Jwts.builder()
                .subject(utilisateur.getEmail())
                .claim("role", utilisateur.getRole().name()) // Ajouter un claim pour le rôle de l'utilisateur
                .claim("name", utilisateur.getNom()) // Ajouter un claim pour le nom
                .claim("phone", utilisateur.getNumTel()) // Ajouter un claim pour le téléphone
                .claim("id", utilisateur.getId()) // Ajouter 
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey())
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
    	return Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    
    }
    
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

  

    public Boolean validateToken(String token, Utilisateur userDetails) {
        final String Username = extractUserName(token);
        boolean isExpired = isTokenExpired(token);
        System.out.println("Email extrait du jeton: " + Username);
        System.out.println("Le jeton est expiré: " + isExpired);
        return (Username.equals(userDetails.getEmail()) && !isExpired);
    }

    public String getValidationError(String token, Utilisateur userDetails) {
        final String userName = extractUserName(token);
        if (!userName.equals(userDetails.getEmail())) {
            return "Le nom d'utilisateur extrait du jeton ne correspond pas à l'utilisateur.";
        }
        if (isTokenExpired(token)) {
            return "Le jeton est expiré.";
        }
        return "Le jeton est invalide pour une autre raison.";
    }
    // Rafraîchir un token expiré
    public String refreshToken(String token, Utilisateur userDetails) {
        if (isTokenExpired(token)) {
            return generateToken(userDetails);
        }
        return token;
    }
}