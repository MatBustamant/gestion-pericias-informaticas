/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.service;

import com.grupocapa8.persis.dao.UsuarioDAO;
import com.grupocapa8.persis.model.Usuario;
import java.util.List;
import java.util.NoSuchElementException;
import org.mindrot.jbcrypt.BCrypt;

/**
 *
 * @author Matias
 */
public class UsuarioService implements ServiceGenerico<Usuario> {
    
   private final UsuarioDAO usuarioDAO; //acceso a la BD
   
    public UsuarioService() {
        this.usuarioDAO = new UsuarioDAO();
    }
    
    public Usuario login(String nombreUsuario, String password) throws NoSuchElementException, IllegalArgumentException, SecurityException {
        // Buscamos si existe el usuario
        Usuario usuario = usuarioDAO.buscar(nombreUsuario);
        if (usuario == null) {
            throw new NoSuchElementException("No existe el usuario");
        }
        // Si existe, chequeamos que las passwords coincidan
        if (!BCrypt.checkpw(password, usuario.getPassword())) {
            throw new SecurityException("Password incorrecta");
        }
        // Quitamos la password del DTO y lo devolvemos
        usuario.setPassword(null);
        return usuario;
    }

    @Override
    public Usuario buscar(int id) throws NoSuchElementException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<Usuario> buscarTodos() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Usuario crear(Usuario entidad) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void modificar(Usuario entidad, int id) throws NoSuchElementException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void eliminar(int id) throws NoSuchElementException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
