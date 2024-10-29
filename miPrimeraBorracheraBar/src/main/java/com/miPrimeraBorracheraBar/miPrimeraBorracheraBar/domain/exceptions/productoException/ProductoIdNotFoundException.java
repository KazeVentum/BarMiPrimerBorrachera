package com.miPrimeraBorracheraBar.miPrimeraBorracheraBar.domain.exceptions.productoException;

public class ProductoIdNotFoundException extends RuntimeException{
    public ProductoIdNotFoundException(String message){
        super(message);
    }
}
