package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;


import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements.SedeInterfaceImpl;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Sede;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sede")
@SecurityRequirement(name = "bearerAuth")

public class SedeController {
    private final SedeInterfaceImpl sedeInterfaceImpl;

    @Autowired
    public SedeController(SedeInterfaceImpl sedeInterfaceImpl) {
        this.sedeInterfaceImpl = sedeInterfaceImpl;
    }

    @GetMapping
    public List<Sede> getAllSede() {
        return sedeInterfaceImpl.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sede> getSedeById(@PathVariable Long id) {
        return sedeInterfaceImpl.getById(id);
    }

    @PostMapping
    public ResponseEntity<Sede> saveSede(@RequestBody Sede sede) {
        return sedeInterfaceImpl.save(sede);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSede(@PathVariable Long id) {
        return sedeInterfaceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sede> updateSede(@PathVariable Long id, @RequestBody Sede sede) {
        return sedeInterfaceImpl.update(id, sede);
    }


}
