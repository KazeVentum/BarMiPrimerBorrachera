package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Inventario;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface InventarioInterface {
    List<Inventario> getAll();
    ResponseEntity<Inventario> getById(Object id);
    ResponseEntity<Inventario> save(Inventario inventario);
    ResponseEntity<Void> delete(Long id);
    ResponseEntity<Inventario> update(Object id, Inventario inventario);
}
