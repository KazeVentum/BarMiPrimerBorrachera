package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.security.Constans.*;

@Configuration
public class JWTAuthtenticationConfig {

    public String getJWTToken(String username, String rol) {
        // Convertir el rol en una lista de GrantedAuthority
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_" + rol.toUpperCase());

        // Construir el token con el rol como claim
        String token = Jwts
                .builder()
                .setId("campuscl")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .claim("role", rol)  // Agregar el rol como un claim adicional
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
                .signWith(getSigningKey(SUPER_SECRET_KEY), SignatureAlgorithm.HS512).compact();

        return "Bearer " + token;
    }
}
