package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Rol;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RolInterface <T> {
    List<T> getAll();
    ResponseEntity<T> getById(Object id);
    ResponseEntity<T> save(T t);

    ResponseEntity<Rol> save(Rol rol);

    ResponseEntity<Void> delete(Long id);
    ResponseEntity<T> update(Object id, T t);

    ResponseEntity<Rol> update(Object id, Rol rolUpdate);
}
