package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.mesaXSede;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class MesaXSedeId implements Serializable {

    @Column(name = "id_mesa")
    private Long idMesa;

    @Column(name = "id_sede")
    private Long idSede;

    public Long getIdSede() {
        return idSede;
    }

    public void setIdSede(Long idSede) {
        this.idSede = idSede;
    }

    public Long getIdMesa() {
        return idMesa;
    }

    public void setIdMesa(Long idMesa) {
        this.idMesa = idMesa;
    }
}
