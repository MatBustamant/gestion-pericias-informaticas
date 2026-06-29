/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.model;

import com.grupocapa8.persis.enums.EstadoSolicitud;
import com.grupocapa8.persis.enums.TipoSolicitud;
import com.grupocapa8.persis.enums.Urgencia;
import java.time.Instant;

/**
 *
 * @author Matias
 */
public class Solicitud {
    private int id;
    private Causa causa;
    private int numInterno;
    private TipoSolicitud tipo;
    private int año;
    private String circunscripcion;
    private String descripcionSecuestros;
    private Urgencia urgencia;
    private EstadoSolicitud estado;
    private Instant fechaApertura;
    private String fiscalSolicitante;

    public Solicitud(int id, Causa causa, int numInterno, TipoSolicitud tipo, int año, String circunscripcion, String descripcionSecuestros, Urgencia urgencia, EstadoSolicitud estado, Instant fechaApertura, String fiscalSolicitante) {
        this.id = id;
        this.causa = causa;
        this.numInterno = numInterno;
        this.tipo = tipo;
        this.año = año;
        this.circunscripcion = circunscripcion;
        this.descripcionSecuestros = descripcionSecuestros;
        this.urgencia = urgencia;
        this.estado = estado;
        this.fechaApertura = fechaApertura;
        this.fiscalSolicitante = fiscalSolicitante;
    }

    public Solicitud() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Causa getCausa() {
        return causa;
    }

    public void setCausa(Causa causa) {
        this.causa = causa;
    }

    public int getNumInterno() {
        return numInterno;
    }

    public void setNumInterno(int numInterno) {
        this.numInterno = numInterno;
    }

    public TipoSolicitud getTipo() {
        return tipo;
    }

    public void setTipo(TipoSolicitud tipo) {
        this.tipo = tipo;
    }

    public int getAño() {
        return año;
    }

    public void setAño(int año) {
        this.año = año;
    }

    public String getCircunscripcion() {
        return circunscripcion;
    }

    public void setCircunscripcion(String circunscripcion) {
        this.circunscripcion = circunscripcion;
    }

    public String getDescripcionSecuestros() {
        return descripcionSecuestros;
    }

    public void setDescripcionSecuestros(String descripcionSecuestros) {
        this.descripcionSecuestros = descripcionSecuestros;
    }

    public Urgencia getUrgencia() {
        return urgencia;
    }

    public void setUrgencia(Urgencia urgencia) {
        this.urgencia = urgencia;
    }

    public EstadoSolicitud getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitud estado) {
        this.estado = estado;
    }

    public Instant getFechaApertura() {
        return fechaApertura;
    }

    public void setFechaApertura(Instant fechaApertura) {
        this.fechaApertura = fechaApertura;
    }

    public String getFiscalSolicitante() {
        return fiscalSolicitante;
    }

    public void setFiscalSolicitante(String fiscalSolicitante) {
        this.fiscalSolicitante = fiscalSolicitante;
    }
}
