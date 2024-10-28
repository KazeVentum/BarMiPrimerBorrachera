package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity;

import jakarta.persistence.*;

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio_distribuidor")
    private int precio_distribuidor;


    @Column(name = "imagen")
    private String imagen;

    //Constructor
    public Producto() {
    }

    //set and get
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPrecio_distribuidor() {
        return precio_distribuidor;
    }

    public void setPrecio_distribuidor(int precio_distribuidor) {
        this.precio_distribuidor = precio_distribuidor;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    //To String Method
    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio_distribuidor=" + precio_distribuidor +
                ", imagen='" + imagen + '\'' +
                '}';
    }
}
