/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.model;

import com.grupocapa8.persis.enums.RolUsuario;

/**
 *
 * @author Matias
 */
public class Usuario {
    private int id;
    private String nombreApellido;
    private String username;
    private String password;
    private RolUsuario rol;
    private boolean eliminado;

    public Usuario(int id, String nombreApellido, String username, String password, RolUsuario Rol, boolean eliminado) {
        this.id = id;
        this.nombreApellido = nombreApellido;
        this.username = username;
        this.password = password;
        this.rol = Rol;
        this.eliminado = eliminado;
    }
    
    public Usuario(){
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getNombreApellido() {
        return nombreApellido;
    }
    
    public void setNombreApellido(String nombreApellido) {
        this.nombreApellido = nombreApellido;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RolUsuario getRol() {
        return rol;
    }

    public void setRol(RolUsuario rol) {
        this.rol = rol;
    }

    public boolean isEliminado() {
        return eliminado;
    }

    public void setEliminado(boolean eliminado) {
        this.eliminado = eliminado;
    }
}
