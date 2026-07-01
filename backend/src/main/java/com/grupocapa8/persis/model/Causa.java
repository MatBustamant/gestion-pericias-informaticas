/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.model;

import com.grupocapa8.persis.enums.TipoSolicitud;

/**
 *
 * @author Matias
 */
public class Causa {
    private int id;
    private String numExpediente;
    private String delito;
    private TipoSolicitud tipo;
    private String imputados;
    private String victimas;

    public Causa(int id, String numExpediente, String delito, TipoSolicitud tipo, String imputados, String victimas) {
        this.id = id;
        this.numExpediente = numExpediente;
        this.delito = delito;
        this.tipo = tipo;
        this.imputados = imputados;
        this.victimas = victimas;
    }

    public Causa() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumExpediente() {
        return numExpediente;
    }

    public void setNumExpediente(String numExpediente) {
        this.numExpediente = numExpediente;
    }

    public String getDelito() {
        return delito;
    }

    public void setDelito(String delito) {
        this.delito = delito;
    }

    public TipoSolicitud getTipo() {
        return tipo;
    }

    public void setTipo(TipoSolicitud tipo) {
        this.tipo = tipo;
    }

    public String getImputados() {
        return imputados;
    }

    public void setImputados(String imputados) {
        this.imputados = imputados;
    }

    public String getVictimas() {
        return victimas;
    }

    public void setVictimas(String victimas) {
        this.victimas = victimas;
    }
}
