package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.productoException.ProductoIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.productoException.ProductoNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.ProductoRepository;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces.ProductoInterface;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoInterfaceImpl implements ProductoInterface {

    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoInterfaceImpl(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }

    @Override
    public List<Producto> getAll() {
        return productoRepository.findAll();
    }

    @Override
    public ResponseEntity<Producto> getById(Object id) {
        try{
            Long newId = Long.parseLong(id.toString());
            Producto producto = productoRepository.findById(newId)
                    .orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado"));
            return ResponseEntity.ok(producto);
        } catch( NumberFormatException e){
            throw new ProductoIdNotFoundException("Has ingresado una letra u otro caracter diferente a un número de tipo Long");
        }
    }

    @Override
    public ResponseEntity<Producto> save(Producto producto) {
        productoRepository.save(producto);
        return ResponseEntity.ok(producto);
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        if (productoRepository.existsById(id)){
            productoRepository.deleteById(id);
            return  ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Producto> update(Object id, Producto productoUpdate) {
        try {
            Long newId  = Long.parseLong(id.toString());
            Optional<Producto> optionalProducto = productoRepository.findById(newId);
            if (optionalProducto.isPresent()) {
                Producto productoExistente = optionalProducto.get();
                productoExistente.setNombre(productoUpdate.getNombre());
                productoExistente.setImagen(productoUpdate.getImagen());
                productoExistente.setPrecio_distribuidor(productoUpdate.getPrecio_distribuidor());
                productoRepository.save(productoExistente);
                return ResponseEntity.ok(productoExistente);
            } else{
                throw new ProductoNotFoundException("Producto no encontrado");
            }
        } catch( NumberFormatException e){
        throw new ProductoIdNotFoundException("Has ingresado una letra u otro caracter diferente a un número de tipo Long");
    }
    }
}
