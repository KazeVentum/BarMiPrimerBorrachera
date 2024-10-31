package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Mesa;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface MesaInterface {
    List<Mesa> getAll();
    ResponseEntity<Mesa> getById(Object id);
    ResponseEntity<Mesa> save(Mesa mesa);
    ResponseEntity<Void> delete(Long id);
    ResponseEntity<Mesa> update(Object id, Mesa mesa);
}
