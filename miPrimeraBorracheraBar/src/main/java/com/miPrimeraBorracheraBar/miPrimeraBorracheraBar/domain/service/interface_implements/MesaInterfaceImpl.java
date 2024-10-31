package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interface_implements;



import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.mesaException.MesaIdNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.mesaException.MesaNotFoundException;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.repository.MesaRepository;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.service.interfaces.MesaInterface;

import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Mesa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MesaInterfaceImpl implements MesaInterface {

    private final MesaRepository mesaRepository;

    @Autowired
    public MesaInterfaceImpl(MesaRepository mesaRepository){
        this.mesaRepository = mesaRepository;
    }


    @Override
    public List<Mesa> getAll() {
        return mesaRepository.findAll();
    }

    @Override
    public ResponseEntity<Mesa> getById(Object id) {
        try {
            Long newId = Long.parseLong(id.toString());
            Mesa mesa = mesaRepository.findById(newId)
                    .orElseThrow(() -> new MesaNotFoundException("Mesa no encontrada"));
            return ResponseEntity.ok(mesa);
        } catch (NumberFormatException e ){
            throw new MesaIdNotFoundException("Has ingresado una letra u otro caracter diferente a un numero de tipo long");
        }
    }

    @Override
    public ResponseEntity<Mesa> save(Mesa mesa) {
        mesaRepository.save(mesa);
        return ResponseEntity.ok(mesa);
    }

    @Override
    public ResponseEntity<Void> delete(Long id) {
        if (mesaRepository.existsById(id)) {
            mesaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Mesa> update(Object id, Mesa mesaUpdate) {
        try {
            Long newId = Long.parseLong(id.toString());
            Optional<Mesa> optionalMesa = mesaRepository.findById(newId);
            if(optionalMesa.isPresent()) {
                Mesa mesaExistente = optionalMesa.get();
                mesaExistente.setNombre(mesaUpdate.getNombre());
                mesaExistente.setEstado(mesaUpdate.getEstado());
                mesaExistente.setNumSillas(mesaUpdate.getNumSillas());
                mesaRepository.save(mesaExistente);
                return ResponseEntity.ok(mesaExistente);
            }else {
                throw new MesaNotFoundException("Mesa no encontrada por dicho Id para actualizar");
            }
        } catch (NumberFormatException e) {
            throw new MesaIdNotFoundException(" Has ingresado una letra u otro caracter diferente a un numero de tipo long");
        }
    }
}

