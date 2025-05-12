package com.pfe.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.List;

// @RestController
// @RequestMapping("/ auth")
public class AuthController {
    // @Autowired
    // private AuthService authService;
    // // @Autowired
    // // private JwtService jwtService;




    // @GetMapping("/{email}")
    // public ResponseEntity<Utilisateur> getUtilisateur(@PathVariable String email) {
    //     Utilisateur utilisateur = authService.getUtilisateurByEmail(email);
    //     return ResponseEntity.ok(utilisateur);
    // }

    // @GetMapping("/all")
    // public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
    //     return ResponseEntity.ok(authService.findAllUtilisateurs());
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
    //     return authService.findUtilisateurById(id)
    //             .map(ResponseEntity::ok)
    //             .orElseGet(() -> ResponseEntity.notFound().build());
    // }

    // @PostMapping("/register")
    // public ResponseEntity<String> register(@RequestBody Utilisateur utilisateur) {
    //     return ResponseEntity.ok(authService.registerUtilisateur(utilisateur));
    // }
    // // @PostMapping("/login")
    // // public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
    // //     if (authService.authenticate(email, password)) {
    // //         // Récupérer l'utilisateur par son email
    // //         Utilisateur utilisateur = authService.getUtilisateurByEmail(email);

    // //         // Extraire les informations nécessaires de l'utilisateur
    // //         Long id = utilisateur.getId();
    // //         String nom = utilisateur.getNom();
    // //         String prenom = utilisateur.getPrenom();
    // //         Role role = utilisateur.getRole();

    // //         // Générer un token JWT avec toutes les informations
    // //         String token = jwtService.generateToken(email, id, nom, prenom, role);

    // //         // Retourner le token
    // //         return ResponseEntity.ok(token);
    // //     } else {
    // //         return ResponseEntity.status(401).body("Authentification échouée");
    // //     }
    // // }


    // @DeleteMapping("/delete")
    // public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
    //     authService.deleteUtilisateur(id);
    //     return ResponseEntity.noContent().build();
    // }

    // @PutMapping("/update-password")
    // public ResponseEntity<Void> updatePassword(@PathVariable Long id, @RequestParam String newPassword) {
    //     authService.updatePassword(id, newPassword);
    //     return ResponseEntity.noContent().build();
    // }

    // @PutMapping("/update/{id}")
    // public ResponseEntity<String> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateurDetails) {
    //     String updatedUtilisateur = authService.updateUtilisateur(id, utilisateurDetails);
    //     return ResponseEntity.ok(updatedUtilisateur);
    // }


    // /// //////////////
    // // @GetMapping("/validate-token")
    // // public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String authHeader) {
    // //     String token = authHeader.replace("Bearer ", "");

    // //     if (jwtService.validateToken(token)) {
    // //         String email = jwtService.getEmailFromToken(token);
    // //         return ResponseEntity.ok("Token valide pour l'utilisateur : " + email);
    // //     } else {
    // //         return ResponseEntity.status(401).body("Token invalide");
    // //     }
    // // }

    // // @PostMapping("/refresh")
    // // public ResponseEntity<String> refreshToken(@RequestHeader("Authorization") String authHeader) {
    // //     // Extraire le token depuis l'en-tête Authorization
    // //     String token = authHeader.replace("Bearer ", "");

    // //     try {
    // //         // Rafraîchir le token
    // //         String newToken = jwtService.refreshToken(token);
    // //         return ResponseEntity.ok("Nouveau token : " + newToken);
    // //     } catch (Exception e) {
    // //         // Si le token est invalide ou expiré
    // //         return ResponseEntity.status(401).body("Le token est invalide ou expiré.");
    // //     }
    // // }

}
