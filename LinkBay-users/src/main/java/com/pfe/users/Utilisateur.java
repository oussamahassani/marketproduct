package com.pfe.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Document(collection = "utilisateurs")

//@Entity
//@Table(name = "utilisateurs")
public class Utilisateur implements UserDetails {
    @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

   // @Column(nullable = false)
    private String nom;

  //  @Column(nullable = false)
    private String prenom;

   // @Column(unique = true, length = 100, nullable = false)
    private String email;

    //@Column(nullable = false, length = 60) // BCrypt hash length
    private String password;

    //@Column(nullable = false)
    private String numTel;

    //@Column(nullable = false)
    private String adresse;

   // @NonNull
   // @Enumerated(EnumType.STRING)
    //@Column(nullable = false)
    private RoleEnum role;
    private Boolean enabled = true;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }


    @Override
    public String getPassword() {

        return password;
    }


    @Override
    public String getUsername() {

        return email;
    }

    @Override

    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

  @Override
    public boolean isEnabled() {


        return enabled;
    }

}