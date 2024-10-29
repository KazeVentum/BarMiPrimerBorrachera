package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.inventarioException;

public class InventarioNotFoundException extends RuntimeException{
    public InventarioNotFoundException(String message){
        super(message);
    }
}
