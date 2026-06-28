/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.service;

import com.grupocapa8.persis.dao.CausaDAO;
import com.grupocapa8.persis.model.Causa;
import java.util.List;
import java.util.NoSuchElementException;

/**
 *
 * @author Matias
 */
public class CausaService implements ServiceGenerico<Causa> {
    
    private final CausaDAO causaDAO = new CausaDAO();

    @Override
    public Causa buscar(int id) throws NoSuchElementException {
        Causa causa = causaDAO.buscarPorId(id);
        if (causa == null) {
            throw new NoSuchElementException("No existe la causa con id " + id);
        }
        return causa;
    }
    
    public Causa buscarPorNumExpediente(String numExpediente) {
        return causaDAO.buscarPorNumExpediente(numExpediente);  // null si no existe
    }

    @Override
    public List<Causa> buscarTodos() {
        return causaDAO.buscarTodos();
    }

    @Override
    public void crear(Causa entidad) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void modificar(Causa entidad, int id) throws NoSuchElementException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void eliminar(int id) throws NoSuchElementException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
