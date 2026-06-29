/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.controller;

import com.grupocapa8.persis.model.Causa;
import com.grupocapa8.persis.service.CausaService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import java.util.NoSuchElementException;

/**
 *
 * @author Matias
 */
@Path("causa")
public class CausaController extends AbstractController<Causa> {

    public CausaController() {
        this.servicio = new CausaService();
    }

    @GET
    @Path("buscar")
    public Response buscarPorExpediente(@QueryParam("expediente") String exp) {
        try {
            Causa causa = ((CausaService) servicio).buscarPorNumExpediente(exp);
            return Response.ok(causa).build();
        } catch (NoSuchElementException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        } catch (UnsupportedOperationException e) {
            return Response.status(Response.Status.NOT_IMPLEMENTED).entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("{\"error\":\"" + e.getMessage() + "\"}").build();
        }
    }

}
