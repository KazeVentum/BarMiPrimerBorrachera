package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository;


import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventarioRepository extends JpaRepository <Inventario, Long> {
}


