/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.dto;

import com.grupocapa8.persis.model.Causa;
import com.grupocapa8.persis.model.Solicitud;
import java.util.List;

/**
 *
 * @author Matias
 */
public class SolicitudRequest {
    private Causa causa;
    private Solicitud solicitud;
    private List<Integer> peritosIds;
    private String tareasSolicitadas;

    public Causa getCausa() {
        return causa;
    }

    public void setCausa(Causa causa) {
        this.causa = causa;
    }

    public Solicitud getSolicitud() {
        return solicitud;
    }

    public void setSolicitud(Solicitud solicitud) {
        this.solicitud = solicitud;
    }

    public List<Integer> getPeritosIds() {
        return peritosIds;
    }

    public void setPeritosIds(List<Integer> peritosIds) {
        this.peritosIds = peritosIds;
    }

    public String getTareasSolicitadas() {
        return tareasSolicitadas;
    }

    public void setTareasSolicitadas(String tareasSolicitadas) {
        this.tareasSolicitadas = tareasSolicitadas;
    }
}
