/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.service;

import com.grupocapa8.persis.dao.CausaDAO;
import com.grupocapa8.persis.dao.SolicitudDAO;
import com.grupocapa8.persis.dto.SolicitudRequest;
import com.grupocapa8.persis.enums.EstadoSolicitud;
import com.grupocapa8.persis.model.Causa;
import com.grupocapa8.persis.model.Solicitud;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

/**
 *
 * @author Matias
 */
public class SolicitudService implements ServiceGenerico<SolicitudRequest> {

    private final SolicitudDAO solicitudDAO = new SolicitudDAO();
    private final CausaDAO causaDAO = new CausaDAO();

    @Override
    public SolicitudRequest buscar(int id) throws NoSuchElementException {
        Solicitud s = solicitudDAO.buscarPorId(id);
        if (s == null) throw new NoSuchElementException("No existe la solicitud");
        return armarResponse(s);
    }
    
    public SolicitudRequest buscarPorNumInterno(int numInterno, int anio, String tipo) {
        Solicitud s = solicitudDAO.buscarPorNumInterno(numInterno, anio, tipo);
        if (s == null) return null;
        return armarResponse(s);
    }

    @Override
    public List<SolicitudRequest> buscarTodos() {
        List<Solicitud> lista = solicitudDAO.buscarTodos();
        return lista.stream().map(this::armarResponse).collect(Collectors.toList());
    }
    
    private SolicitudRequest armarResponse(Solicitud s) {
        Causa causa = causaDAO.buscarPorId(s.getCausa().getId());
        SolicitudRequest req = new SolicitudRequest();
        req.setSolicitud(s);
        req.setCausa(causa);
        return req;
    }

    @Override
    public void crear(SolicitudRequest req) {
        // 1. Buscar causa por numExpediente
        Causa causa = causaDAO.buscarPorNumExpediente(req.getCausa().getNumExpediente());
        // 2. Si no existe, crearla
        if (causa == null) {
            int idCausa = causaDAO.insertar(req.getCausa());
            causa = req.getCausa();
            causa.setId(idCausa);
        }
        // 3. Asignar causa a solicitud y setear defaults
        req.getSolicitud().setCausa(causa);
        req.getSolicitud().setEstado(EstadoSolicitud.PENDIENTE);
        req.getSolicitud().setFechaApertura(null);
        // 4. Insertar solicitud
        solicitudDAO.insertar(req.getSolicitud());
    }

    @Override
    public void modificar(SolicitudRequest req, int id) {
        // 1. Obtener solicitud actual
        Solicitud actual = solicitudDAO.buscarPorId(id);
        // 2. Si cambió el numExpediente → buscar o crear nueva causa
        String nuevoExp = req.getCausa().getNumExpediente();
        if (!nuevoExp.equals(actual.getCausa().getNumExpediente())) {
            Causa causa = causaDAO.buscarPorNumExpediente(nuevoExp);
            if (causa == null) {
                int idCausa = causaDAO.insertar(req.getCausa());
                causa = req.getCausa();
                causa.setId(idCausa);
            }
            req.getSolicitud().setCausa(causa);
        } else {
            // Mismo expediente → actualizar datos de la causa
            causaDAO.actualizar(req.getCausa());
            req.getSolicitud().setCausa(req.getCausa());
        }
        req.getSolicitud().setId(id);
        solicitudDAO.actualizar(req.getSolicitud());
    }

    @Override
    public void eliminar(int id) {
        Solicitud s = solicitudDAO.buscarPorId(id);
        int idCausa = s.getCausa().getId();
        solicitudDAO.eliminar(id);
        if (solicitudDAO.contarPorCausa(idCausa) == 0) {
            causaDAO.eliminar(idCausa);
        }
    }
}
