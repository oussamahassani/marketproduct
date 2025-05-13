package com.pfe.users.Auth;

import com.pfe.users.RoleEnum;
import com.pfe.users.Utilisateur;
import com.pfe.users.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*") // ou l'adresse de ton frontend React

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> register(@RequestBody Utilisateur utilisateur) {
        if (utilisateur.getRole() == null) {
            utilisateur.setRole(RoleEnum.ACHETEUR); // Default role
        }
        Utilisateur createdUser = userService.createUser(utilisateur);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = userService.findAll();
        return ResponseEntity.ok(utilisateurs);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Utilisateur> optionalUser = userService.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        Utilisateur utilisateur = optionalUser.get();

        // Verify password
        if (!BCrypt.checkpw(loginRequest.getPassword(), utilisateur.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(utilisateur);

        // Create response
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", utilisateur.getEmail());
        response.put("role", utilisateur.getRole().toString());

        return ResponseEntity.ok(response);
    }

    // DTO for login request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}