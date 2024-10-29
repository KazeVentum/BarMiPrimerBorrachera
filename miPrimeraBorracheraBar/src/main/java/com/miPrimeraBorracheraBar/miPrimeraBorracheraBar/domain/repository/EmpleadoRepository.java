package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Empleado findByNombre(String name);
}
