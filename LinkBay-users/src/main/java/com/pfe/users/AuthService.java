package com.pfe.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

// @Service
public class AuthService {
//     @Autowired
//     private static UtilisateurRepository utilisateurRepository;


//     private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Instanciation de BCryptPasswordEncoder

//     public String registerUtilisateur(Utilisateur utilisateur) {

//         if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
//             throw new RuntimeException("L'email est déjà utilisé");
//         }
//         // Hacher le mot de passe avant de l'enregistrer
//         String hashedPassword = passwordEncoder.encode(utilisateur.getPassword());
//         utilisateur.setPassword(hashedPassword);

//         utilisateurRepository.save(utilisateur);

//         return "Utilisateur enregistré avec succès!";
//     }


//     public boolean authenticate(String email, String password) {
//         Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

//         // Comparer le mot de passe saisi avec celui dans la base de données
//         return passwordEncoder.matches(password, utilisateur.getPassword());
//     }
//  ///////////////
//  ///
//  public Utilisateur getUtilisateurByEmail(String email) {
//      return utilisateurRepository.findByEmail(email)
//              .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé !"));
//  }

//     public List<Utilisateur> findAllUtilisateurs() {
//         return utilisateurRepository.findAll();
//     }

//     public Optional<Utilisateur> findUtilisateurById(Long id) {
//         return utilisateurRepository.findById(id);
//     }

//     public String deleteUtilisateur(Long id) {
//         Utilisateur utilisateur = utilisateurRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));
//         utilisateurRepository.delete(utilisateur);
//         return "L'utilisateur avec l'ID " + id + " a été supprimé avec succès.";

//     }

//     //Mettre à jour le mot de passe
//     public String updatePassword(Long id, String newPassword) {
//         Utilisateur utilisateur = utilisateurRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));

//         String hashedPassword = passwordEncoder.encode(newPassword);
//         utilisateur.setPassword(hashedPassword);
//         utilisateurRepository.save(utilisateur);

//         return "Le mot de passe a été modifié avec succès.";
//     }
//     //Mettre à jour utilisateur
//     public String updateUtilisateur(Long id, Utilisateur utilisateurDetails) {
//         Utilisateur utilisateur = utilisateurRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));

//         // Mettre à jour les champs
//         utilisateur.setNom(utilisateurDetails.getNom());
//         utilisateur.setPrenom(utilisateurDetails.getPrenom());
//         utilisateur.setEmail(utilisateurDetails.getEmail());
//         utilisateur.setNumTel(utilisateurDetails.getNumTel());
//         utilisateur.setAdresse(utilisateurDetails.getAdresse());
//         utilisateur.setRole(utilisateurDetails.getRole());

//         // Si le mot de passe est fourni, le hacher avant de le mettre à jour
//         if (utilisateurDetails.getPassword() != null && !utilisateurDetails.getPassword().isEmpty()) {
//             String hashedPassword = passwordEncoder.encode(utilisateurDetails.getPassword());
//             utilisateur.setPassword(hashedPassword);
//         }

//          utilisateurRepository.save(utilisateur);
//         return "L'utilisateur avec l'ID " + id + " a été mis à jour avec succès.";
//     }
}