package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.EmpleadoIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.EmpleadoNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.SedeIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.SedeNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.SedeRepository;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Empleado;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Sede;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SedeInterfaceImpl implements SedeInterface{

    private final SedeRepository sedeRepository;

    @Autowired
    public SedeInterfaceImpl(SedeRepository sedeRepository) {
        this.sedeRepository = sedeRepository;
    }

    @Override
    public List<Sede> getAll() {
        return sedeRepository.findAll();
    }

    @Override
    public ResponseEntity<Sede> getById(Object id) {
        try {
            Long newId = Long.parseLong(id.toString());
            Sede sede = sedeRepository.findById(newId)
                    .orElseThrow(() -> new SedeNotFoundException("La Sede no se encontrado"));
            return ResponseEntity.ok(sede);
        } catch (NumberFormatException e) {
            throw new SedeIdNotFoundException("Has ingresado una letra u otro caracter diferente a un número de tipo Long");
        }
    }

    @Override
    public ResponseEntity<Sede> save(Sede sede) {
        sedeRepository.save(sede);
        return ResponseEntity.ok(sede);
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        if (sedeRepository.existsById(id)) {
            sedeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Sede> update(Object id, Sede sedeUpdate) {
        try {
            Long newId = Long.parseLong(id.toString());
            Optional<Sede> optionalSede = sedeRepository.findById(newId);
            if (optionalSede.isPresent()) {
                Sede sedeExistente = optionalSede.get();
                sedeExistente.setNombre(sedeUpdate.getNombre());
                sedeExistente.setDireccion(sedeUpdate.getDireccion());
                sedeExistente.setCiudad(sedeUpdate.getCiudad());
                sedeRepository.save(sedeExistente);
                return ResponseEntity.ok(sedeExistente);
            } else {
                throw new SedeNotFoundException("La Sede no se encuentra por dicho ID para actualizar");
            }
        } catch (NumberFormatException e) {
            throw new SedeIdNotFoundException("Has ingresado una letra u otro caracter diferente a un número de tipo Long");
        }
    }
}
