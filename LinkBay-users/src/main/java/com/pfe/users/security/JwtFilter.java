package com.pfe.users.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
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
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            final String authHeader = request.getHeader("Authorization");
            String token = null;
            String userName = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                userName = jwtService.extractUserName(token);

                System.out.println("Token extrait: " + token);
                System.out.println("Nom d'utilisateur extrait: " + userName);

                // Vérifie qu'aucune autre authentification n'est déjà définie
                if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    Optional<Utilisateur> optionalUser = userService.findByEmail(userName);

                    if (optionalUser.isPresent()) {
                        Utilisateur user = optionalUser.get();
                        System.out.println("Utilisateur trouvé: " + user.getNom());

                        if (jwtService.validateToken(token, user)) {
                            System.out.println("Authentification réussie pour l'utilisateur: " + userName);

                            UsernamePasswordAuthenticationToken authToken =
                                    new UsernamePasswordAuthenticationToken(
                                            user,
                                            null,
                                            user.getAuthorities()
                                    );

                            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        } else {
                            String reason = jwtService.getValidationError(token, user);
                            System.out.println("Jeton invalide pour l'utilisateur: " + userName);
                            System.out.println("Raison de l'échec de validation : " + reason);
                        }
                    } else {
                        System.out.println("Aucun utilisateur trouvé avec l'email : " + userName);
                    }
                }
            } else {
                System.out.println("Aucun jeton trouvé dans l'en-tête Authorization.");
            }

        } catch (Exception e) {
            System.err.println("Erreur lors du traitement du filtre JWT : " + e.getMessage());
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}
