package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.persistence.entity;

public class User {

    private String user;
    private String pass;
    private String token;
    private Rol rol;

    public User() {
    }

    public User(String user, String pass, String token, Rol rol) {
        this.user = user;
        this.pass = pass;
        this.token = token;
        this.rol = rol;
    }

    // Getters y Setters

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
