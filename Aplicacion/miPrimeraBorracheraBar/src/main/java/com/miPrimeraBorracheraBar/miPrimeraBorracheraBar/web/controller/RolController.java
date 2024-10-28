package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements.RolInterfaceImpl;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Rol;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rol")
@SecurityRequirement(name = "bearerAuth")

public class RolController {
    private final RolInterfaceImpl rolInterfaceImpl;

    @Autowired
    public RolController(RolInterfaceImpl rolInterfaceImpl) {
        this.rolInterfaceImpl = rolInterfaceImpl;
    }

    @GetMapping
    public List<Rol> getAllRol() {
        return rolInterfaceImpl.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Long id) {
        return rolInterfaceImpl.getById(id);
    }

    @PostMapping
    public ResponseEntity<Rol> saveRol(@RequestBody Rol rol) {
        return rolInterfaceImpl.save(rol);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRol(@PathVariable Long id) {
        return rolInterfaceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> updateRol(@PathVariable Long id, @RequestBody Rol rol) {
        return rolInterfaceImpl.update(id, rol);
    }
}