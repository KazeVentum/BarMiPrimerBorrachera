package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.InventarioRepository;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces.InventarioInterface;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Inventario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioInterfaceImpl implements InventarioInterface {

    private final InventarioRepository inventarioRepository;

    @Autowired
    public InventarioInterfaceImpl(InventarioRepository inventarioRepository){
        this.inventarioRepository = inventarioRepository;
    }

    @Override
    public List<Inventario> getAll() {
        return List.of();
    }

    @Override
    public ResponseEntity<Inventario> getById(Object id) {
        return null;
    }

    @Override
    public ResponseEntity<Inventario> save(Inventario inventario) {
        return null;
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Inventario> update(Object id, Inventario inventario) {
        return null;
    }
}
