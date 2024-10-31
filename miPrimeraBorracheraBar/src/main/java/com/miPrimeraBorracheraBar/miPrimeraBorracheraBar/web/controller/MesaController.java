package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements.MesaInterfaceImpl;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Mesa;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Producto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/mesa")
@SecurityRequirement(name = "bearerAuth")

public class MesaController {
    private final MesaInterfaceImpl mesaInterfaceImpl;

    @Autowired
    public MesaController(MesaInterfaceImpl mesaInterfaceImpl) {
        this.mesaInterfaceImpl = mesaInterfaceImpl;
    }

    @GetMapping
    public List<Mesa> getAllMesas(){
        return mesaInterfaceImpl.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mesa> getMesaById(@PathVariable Long id){
        return mesaInterfaceImpl.getById(id);
    }

    @PostMapping
    public ResponseEntity<Mesa> saveMesa(@RequestBody Mesa mesa){
        return mesaInterfaceImpl.save(mesa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id){
        return mesaInterfaceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mesa> updateProducto(@PathVariable Long id, @RequestBody Mesa mesa){
        return mesaInterfaceImpl.update(id, mesa);
    }



}
