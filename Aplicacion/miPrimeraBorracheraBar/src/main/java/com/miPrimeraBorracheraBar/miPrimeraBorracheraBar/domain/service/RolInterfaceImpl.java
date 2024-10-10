package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service;


import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.RolIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.RolNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.RolRepository;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RolInterfaceImpl implements RolInterface<Rol> {

    private final RolRepository rolRepository;

    @Autowired
    public RolInterfaceImpl(RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    @Override
    public List<Rol> getAll() {
        return rolRepository.findAll();
    }

    @Override
    public ResponseEntity<Rol> getById(Object id) {
        try{
            Long  newId = Long.parseLong(id.toString());
            Rol optionalAdmin = rolRepository.findById(newId)
                    .orElseThrow(() -> new RolNotFoundException("Rol no encontrado"));
            return ResponseEntity.ok(optionalAdmin);

        }catch (NumberFormatException e){
            throw new RolIdNotFoundException("Haz ingresado una letra u/o otro caracter diferente a un Número de tipo Long");
        }
    }

    @Override
    public ResponseEntity<Rol> save(Rol rolSave) {
        rolRepository.save(rolSave);
        return ResponseEntity.ok(rolSave);
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        if (rolRepository.existsById(id)) {
            rolRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Rol> update(Object id, Rol rolUpdate) {
        try{
            Long newId = Long.parseLong(id.toString());
            Optional<Rol> optionalRol = rolRepository.findById(newId);
            if(optionalRol.isPresent()){

                Rol rolSend = optionalRol.get();
                rolSend.setNombre(rolUpdate.getNombre());
                rolRepository.save(rolSend);

                return ResponseEntity.ok(rolSend);
            } else {
                throw new RolNotFoundException("Rol no encontrado por dicho ID para actualizar");
            }
        }catch (NumberFormatException e){
            throw new RolIdNotFoundException("Haz ingresado una letra u/o otro caracter diferente a un Número de tipo Long");
        }
    }
}
