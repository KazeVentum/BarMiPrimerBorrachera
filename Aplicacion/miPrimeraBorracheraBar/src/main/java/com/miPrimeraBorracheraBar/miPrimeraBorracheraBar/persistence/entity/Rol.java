package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    public Rol() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    @Column(name = "nombre")
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL)
    private List<Empleado> empleados;

    @Override
    public String toString() {
        return "Rol{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
