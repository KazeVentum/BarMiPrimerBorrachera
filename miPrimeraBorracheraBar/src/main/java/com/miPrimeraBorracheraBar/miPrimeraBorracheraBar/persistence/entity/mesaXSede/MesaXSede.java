package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.mesaXSede;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Mesa;
import com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity.Sede;
import jakarta.persistence.*;


@Entity
@Table(name = "MesaXSede")
public class MesaXSede {
    @EmbeddedId
    private MesaXSedeId id;

    @ManyToOne
    @MapsId("idMesa")
    @JoinColumn(name = "id_mesa")
    private Mesa mesa;


    @ManyToOne
    @MapsId("idSede")
    @JoinColumn(name = "id_sede")
    private Sede sede;

    public MesaXSede() {
    }

    public MesaXSedeId getId() {
        return id;
    }

    public void setId(MesaXSedeId id) {
        this.id = id;
    }

    public Mesa getMesa() {
        return mesa;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }

    public Sede getSede() {
        return sede;
    }

    public void setSede(Sede sede) {
        this.sede = sede;
    }

    @Override
    public String toString() {
        return "MesaXSede{" +
                "id=" + id +
                ", mesa=" + mesa +
                ", sede=" + sede +
                '}';
    }
}
