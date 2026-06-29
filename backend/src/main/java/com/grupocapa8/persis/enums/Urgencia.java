/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package com.grupocapa8.persis.enums;

/**
 *
 * @author Matias
 */
public enum Urgencia {
    ALTA,
    MEDIA,
    BAJA;
    
    @Override
    public String toString() {
        return name();
    }
}
