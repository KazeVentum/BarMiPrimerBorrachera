package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String Ciudad;

    private String Direccion;

    @OneToMany(mappedBy = "sede", cascade = CascadeType.ALL)
    private List<Empleado> empleados;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCiudad() {
        return Ciudad;
    }

    public void setCiudad(String ciudad) {
        Ciudad = ciudad;
    }

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String direccion) {
        Direccion = direccion;
    }

    @Override
    public String toString() {
        return "Sede{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", Ciudad='" + Ciudad + '\'' +
                ", Direccion='" + Direccion + '\'' +
                '}';
    }
}
