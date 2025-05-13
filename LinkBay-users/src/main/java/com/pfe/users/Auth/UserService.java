package com.pfe.users.Auth;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.pfe.users.Utilisateur;

public interface UserService extends UserDetailsService {
      @Autowired
    Utilisateur createUser(Utilisateur utilisateur);
    Optional<Utilisateur> findByEmail(String email);
    List<Utilisateur> findAll();
   Utilisateur findUserByEmail(String email);
}