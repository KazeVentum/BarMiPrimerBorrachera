package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminInterface<T>{
    List<T> getAll();
    ResponseEntity<T> getById(Object id);
    ResponseEntity<T> save(T t);
    ResponseEntity<Void> delete(Long id);
    ResponseEntity<T> update(Object id, T t);
}
