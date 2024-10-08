package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}
