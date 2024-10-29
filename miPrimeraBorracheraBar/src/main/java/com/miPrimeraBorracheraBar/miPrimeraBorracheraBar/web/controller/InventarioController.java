package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;


import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements.InventarioInterfaceImpl;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Inventario;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/inventario")
@SecurityRequirement(name = "bearerAuth")

public class InventarioController {
    private final InventarioInterfaceImpl inventarioInterfaceImpl;

    @Autowired
    public InventarioController(InventarioInterfaceImpl inventarioInterfaceImpl){
        this.inventarioInterfaceImpl = inventarioInterfaceImpl;
    }

    @GetMapping()
    public List<Inventario> getAllInventarios() {
        return inventarioInterfaceImpl.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventario> getInventarioById(@PathVariable Long id) {
        return inventarioInterfaceImpl.getById(id);
    }

    @PostMapping
    public ResponseEntity<Inventario> saveInventario(@RequestBody Inventario inventario) {
        return inventarioInterfaceImpl.save(inventario);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventario(@PathVariable Long id) {
        return inventarioInterfaceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventario> updateInventario (@PathVariable Long id, @RequestBody Inventario inventario){
        return inventarioInterfaceImpl.update(id, inventario);
    }
}
