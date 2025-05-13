package com.pfe.users.Auth;

import com.pfe.users.Utilisateur;
import com.pfe.users.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService , UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    public UserServiceImpl(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public Utilisateur createUser(Utilisateur utilisateur) {
        // Basic validation
        if (utilisateur == null) {
            throw new IllegalArgumentException("Utilisateur cannot be null");
        }
        if (utilisateur.getEmail() == null || utilisateur.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        // Check if email already exists
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists: " + utilisateur.getEmail());
        }
        // Hash password
        String hashedPassword = BCrypt.hashpw(utilisateur.getPassword(), BCrypt.gensalt());
        utilisateur.setPassword(hashedPassword);

        // Save the user
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public Optional<Utilisateur> findByEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        return utilisateurRepository.findByEmail(email);
    }

    @Override
    public List<Utilisateur> findAll() {

        return utilisateurRepository.findAll();
    }

    private ResponseEntity<String> verifyTokenWithUserService(String token) {
        String url = "http://localhost:8001/auth/verify";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("token", token);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            return restTemplate.postForEntity(url, request, String.class);
        } catch (Exception ex) {
            return new ResponseEntity<>("Erreur lors de la vérification du token", HttpStatus.UNAUTHORIZED);
        }
    }

	@Override
	public Utilisateur findUserByEmail(String email) {
		// TODO Auto-generated method stub
		return  utilisateurRepository.findUserByEmail(email);
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    return utilisateurRepository.findByEmail(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
	}
	   

}