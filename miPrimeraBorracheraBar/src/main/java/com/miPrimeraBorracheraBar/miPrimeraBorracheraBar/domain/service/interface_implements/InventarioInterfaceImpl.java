package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.inventarioException.InventarioIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.inventarioException.InventarioNotFoundException;
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
        return inventarioRepository.findAll();
    }

    @Override
    public ResponseEntity<Inventario> getById(Object id) {
        try{
            Long newId = Long.parseLong(id.toString());
            Inventario inventario = inventarioRepository.findById(newId)
                    .orElseThrow(() -> new InventarioNotFoundException("Inventario no encontrado"));
                return ResponseEntity.ok(inventario);
            } catch (NumberFormatException e) {
            throw new InventarioNotFoundException("Has ingresado una letra u otro caracter diferente a un numero de tipo Long");
            }
    }

    @Override
    public ResponseEntity<Inventario> save(Inventario inventario) {
        inventarioRepository.save(inventario);
        return ResponseEntity.ok(inventario);
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        if (inventarioRepository.existsById(id)) {
            inventarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Inventario> update(Object id, Inventario inventarioUpdate) {
       try {
           Long newId = Long.parseLong(id.toString());
           Optional<Inventario> optionalInventario = inventarioRepository.findById(newId);
           if(optionalInventario.isPresent()) {
               Inventario inventarioExistente = optionalInventario.get();
               inventarioExistente.setProducto(inventarioUpdate.getProducto());
               inventarioExistente.setSede(inventarioUpdate.getSede());
               inventarioExistente.setCantidad(inventarioUpdate.getCantidad());
               inventarioExistente.setPrecio_venta(inventarioUpdate.getPrecio_venta());
               inventarioRepository.save(inventarioExistente);
               return ResponseEntity.ok(inventarioExistente);
           }else {
               throw new InventarioNotFoundException("Inventario no encontrado por dicho Id para actualizar");
           }
       } catch (NumberFormatException e) {
        throw new InventarioIdNotFoundException(" Has ingresado una letra u otro caracter diferente a un numero de tipo long");
       }
    }
}
