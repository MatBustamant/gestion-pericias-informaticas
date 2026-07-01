/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.controller;

import com.grupocapa8.persis.dto.SolicitudRequest;
import com.grupocapa8.persis.service.SolicitudService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import java.util.NoSuchElementException;

/**
 *
 * @author Matias
 */
@Path("solicitud")
public class SolicitudController extends AbstractController<SolicitudRequest> {
    
    public SolicitudController() {
        this.servicio = new SolicitudService();
    }
    
    @GET
    @Path("buscar")
    public Response buscarPorNumInterno(
            @QueryParam("num") int num,
            @QueryParam("anio") int anio,
            @QueryParam("tipo") String tipo) {
        try {
            SolicitudRequest req = ((SolicitudService) servicio).buscarPorNumInterno(num, anio, tipo);
            return Response.ok(req).build();
        } catch (NoSuchElementException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        } catch (UnsupportedOperationException e) {
            return Response.status(Response.Status.NOT_IMPLEMENTED).entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }
    
}
