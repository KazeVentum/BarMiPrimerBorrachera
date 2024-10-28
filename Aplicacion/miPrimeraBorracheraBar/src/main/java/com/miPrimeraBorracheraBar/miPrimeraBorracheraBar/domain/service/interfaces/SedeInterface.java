package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Sede;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SedeInterface {
    List<Sede> getAll();
    ResponseEntity<Sede> getById(Object id);
    ResponseEntity<Sede> save(Sede sede);
    ResponseEntity<Void> delete(Long id);
    ResponseEntity<Sede> update(Object id, Sede sede);
}
