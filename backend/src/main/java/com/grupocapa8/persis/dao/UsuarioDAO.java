/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.dao;

import com.grupocapa8.persis.enums.RolUsuario;
import com.grupocapa8.persis.model.Usuario;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author Matias
 */
public class UsuarioDAO {

    private static final Map<String, Usuario> USUARIOS = new LinkedHashMap<>();

    static {
        // Mismos usuarios que en state.js, con jBCrypt de "1234"
        agregar(1, "Laura Suárez",  "laura",   "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.PERITO);
        agregar(2, "Matías Herrera","matias",  "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.PERITO);
        agregar(3, "Verónica Castro", "veronica", "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.PERITO);
        agregar(4, "Diego Romero", "diego", "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.PERITO);
        agregar(5, "Claudia Ríos", "claudia", "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.PERITO);
        agregar(6, "Ignacio Palma", "ignacio", "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.PERITO);
        agregar(7, "Ana González",  "ana",     "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.MESA_ENTRADA);
        agregar(8, "Carlos Méndez", "carlos",  "$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy", RolUsuario.COORDINADOR);
    }

    private static void agregar(int id, String nombre, String username, String hash, RolUsuario rol) {
        USUARIOS.put(username, new Usuario(id, nombre, username, hash, rol, false));
    }

    public Usuario buscar(String username) {
        return USUARIOS.get(username);
    }
    
}
