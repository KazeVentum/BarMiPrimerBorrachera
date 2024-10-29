package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements.ProductoInterfaceImpl;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Producto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/producto")
@SecurityRequirement(name = "bearerAuth")

public class ProductoController {
    private final ProductoInterfaceImpl productoInterfaceImpl;

    @Autowired
    public ProductoController(ProductoInterfaceImpl productoInterfaceImpl) {
        this.productoInterfaceImpl = productoInterfaceImpl;
    }

    @GetMapping
    public List <Producto> getAllProductos(){
        return productoInterfaceImpl.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id){
        return productoInterfaceImpl.getById(id);
    }

    @PostMapping
    public ResponseEntity<Producto> saveProducto(@RequestBody Producto producto){
        return productoInterfaceImpl.save(producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id){
        return productoInterfaceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto producto){
        return productoInterfaceImpl.update(id, producto);
    }
}
