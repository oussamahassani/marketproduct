package com.pfe.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;



@Data
public class LoginDTO {
    private String token;
    private String nom;
    private String role ; 
    public LoginDTO(String token) {
        this.token = token;
    }
    public LoginDTO(String token , String Nom,String role) {
        this.token = token;
        this.nom = Nom;
        this.role = role;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }  
    
    public void setNom(String Nom) {
        this.nom = Nom;
    }
    
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getNom() {
        return nom;
    }
   
    
}
