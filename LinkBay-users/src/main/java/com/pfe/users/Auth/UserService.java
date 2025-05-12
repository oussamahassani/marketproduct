package com.pfe.users.Auth;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.pfe.users.Utilisateur;

public interface UserService {
      @Autowired
    Utilisateur createUser(Utilisateur utilisateur);
    Optional<Utilisateur> findByEmail(String email);
    List<Utilisateur> findAll();
}