package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.productoException;

public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(String message){
        super(message);
    }
}
