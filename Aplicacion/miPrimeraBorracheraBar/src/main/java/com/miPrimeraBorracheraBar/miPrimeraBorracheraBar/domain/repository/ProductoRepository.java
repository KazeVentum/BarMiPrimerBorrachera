package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository <Producto, Long>  {
    Producto findByNombre(String name);
}
