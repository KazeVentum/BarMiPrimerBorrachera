package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Empleado;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EmpleadoInterface {
    List<Empleado> getAll();
    ResponseEntity<Empleado> getById(Object id);
    ResponseEntity<Empleado> save(Empleado empleado);
    ResponseEntity<Void> delete(Long id);
    ResponseEntity<Empleado> update(Object id, Empleado empleado);
}
