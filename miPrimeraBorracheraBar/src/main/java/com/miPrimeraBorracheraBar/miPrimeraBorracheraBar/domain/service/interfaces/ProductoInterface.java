package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;


import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Producto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductoInterface {
    List<Producto> getAll();
    ResponseEntity<Producto> getById(Object id);
    ResponseEntity<Producto> save(Producto producto);
    ResponseEntity<Void> delete(Long id);
    ResponseEntity<Producto> update(Object id, Producto producto);
}
