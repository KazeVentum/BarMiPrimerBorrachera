package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.web.controller;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.EmpleadoInterfaceImpl;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Empleado;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empleado")
@SecurityRequirement(name = "bearerAuth")

public class EmpleadoController {
    private final EmpleadoInterfaceImpl empleadoInterfaceImpl;

    @Autowired
    public EmpleadoController(EmpleadoInterfaceImpl empleadoInterfaceImpl) {
        this.empleadoInterfaceImpl = empleadoInterfaceImpl;
    }

    @GetMapping
    public List<Empleado> getAllEmpleados() {
        return empleadoInterfaceImpl.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        return empleadoInterfaceImpl.getById(id);
    }

    @PostMapping
    public ResponseEntity<Empleado> saveEmpleado(@RequestBody Empleado empleado) {
        return empleadoInterfaceImpl.save(empleado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        return empleadoInterfaceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleado) {
        return empleadoInterfaceImpl.update(id, empleado);
    }
}
