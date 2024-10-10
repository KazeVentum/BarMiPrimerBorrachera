package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.EmpleadoIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.EmpleadoNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.EmpleadoRepository;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoInterfaceImpl implements EmpleadoInterface {

    private final EmpleadoRepository empleadoRepository;

    @Autowired
    public EmpleadoInterfaceImpl(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    @Override
    public List<Empleado> getAll() {
        return empleadoRepository.findAll();
    }

    @Override
    public ResponseEntity<Empleado> getById(Object id) {
        try {
            Long newId = Long.parseLong(id.toString());
            Empleado empleado = empleadoRepository.findById(newId)
                    .orElseThrow(() -> new EmpleadoNotFoundException("Empleado no encontrado"));
            return ResponseEntity.ok(empleado);
        } catch (NumberFormatException e) {
            throw new EmpleadoIdNotFoundException("Has ingresado una letra u otro caracter diferente a un número de tipo Long");
        }
    }

    @Override
    public ResponseEntity<Empleado> save(Empleado empleado) {
        empleadoRepository.save(empleado);
        return ResponseEntity.ok(empleado);
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        if (empleadoRepository.existsById(id)) {
            empleadoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Empleado> update(Object id, Empleado empleadoUpdate) {
        try {
            Long newId = Long.parseLong(id.toString());
            Optional<Empleado> optionalEmpleado = empleadoRepository.findById(newId);
            if (optionalEmpleado.isPresent()) {
                Empleado empleadoExistente = optionalEmpleado.get();
                empleadoExistente.setNombre(empleadoUpdate.getNombre());
                empleadoExistente.setApellidos(empleadoUpdate.getApellidos());
                empleadoExistente.setEmail(empleadoUpdate.getEmail());
                empleadoExistente.setTelefono(empleadoUpdate.getTelefono());
                empleadoExistente.setDireccion(empleadoUpdate.getDireccion());
                empleadoExistente.setRol(empleadoUpdate.getRol());
                empleadoRepository.save(empleadoExistente);
                return ResponseEntity.ok(empleadoExistente);
            } else {
                throw new EmpleadoNotFoundException("Empleado no encontrado por dicho ID para actualizar");
            }
        } catch (NumberFormatException e) {
            throw new EmpleadoIdNotFoundException("Has ingresado una letra u otro caracter diferente a un número de tipo Long");
        }
    }
}
