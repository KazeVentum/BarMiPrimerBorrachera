package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.security.JWTAuthtenticationConfig;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Admin;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private JWTAuthtenticationConfig jwtAuthtenticationConfig;

    @Autowired
    private AdminRepository adminRepository;

    // "https://lonely-cackle-9pw6q9474r93wxr-5500.app.github.dev"
    @CrossOrigin(origins = "http://127.0.0.1:5500" )
    @PostMapping("login")
    public String login(
            @RequestParam("username") String username,
            @RequestParam("password") String password) {

        Admin admin = adminRepository.findByUsername(username);

        if (admin != null && admin.getPassword().equals(password)) {
            // Obtener el rol del admin
            String rol = admin.getRol().getNombre();

            // Generar el token con el rol incluido
            String token = jwtAuthtenticationConfig.getJWTToken(username, rol);
            admin.setToken(token);
            adminRepository.save(admin);
            return token;
        } else {
            throw new RuntimeException("Invalid Information");
        }
    }
}
