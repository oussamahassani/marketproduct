package com.pfe.users.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pfe.users.Utilisateur;
import com.pfe.users.Auth.UserService;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtService;
    private final UserService userService;

    public JwtFilter(JwtUtil jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            String token = null;
            String userName = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                userName = jwtService.extractUserName(token);
                System.out.println("Token extrait: " + token);
                System.out.println("Nom d'utilisateur extrait: " + userName);
                System.out.println("Validation du jeton pour l'utilisateur: " + userName);
                Optional<Utilisateur>  userDetails = userService.findByEmail(userName);
                if (userDetails != null) {
                    System.out.println("Utilisateur trouvé: " + userDetails.get().getNom());
                    System.out.println("Détails de l'utilisateur : " + userDetails);
                    if (jwtService.validateToken(token, userDetails.get())) {
                        System.out.println("Authentification réussie pour l'utilisateur: " + userName);
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails.get(),
                                null,
                                userDetails.get().getAuthorities() // ⚠️ pas getNom()
                            );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else {
                        System.out.println("Jeton invalide pour l'utilisateur: " + userName);
                        System.out.println("Raison de l'échec de validation : " + jwtService.getValidationError(token, userDetails.get()));
                        if (jwtService.getValidationError(token, userDetails.get()).contains("expired")) {
                            System.out.println("Le jeton a expiré");
                        } else if (jwtService.getValidationError(token, userDetails.get()).contains("invalid")) {
                            System.out.println("Le jeton est invalide");
                        } else {
                            System.out.println("Erreur inconnue lors de la validation du jeton");
                        }
                    }
                } else {
                    System.out.println("Aucun utilisateur trouvé avec le nom: " + userName);
                }
            } else {
                System.out.println("Aucun jeton trouvé dans l'en-tête Authorization");
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de l'authentification: " + e.getMessage());
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}
