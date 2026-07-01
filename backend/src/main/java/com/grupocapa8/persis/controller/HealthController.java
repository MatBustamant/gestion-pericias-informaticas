/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.controller;

import com.grupocapa8.persis.config.BaseDeDatos;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.util.Map;

/**
 *
 * @author Matias
 */
@Path("health")
public class HealthController {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> health() {
        String dbStatus;
        try {
            BaseDeDatos.getConnection().close();
            dbStatus = "conectada";
        } catch (Exception e) {
            dbStatus = "error: " + e.getMessage();
        }

        return Map.of(
            "estado", "OK",
            "timestamp", LocalDateTime.now().toString(),
            "baseDeDatos", dbStatus
        );
    }
    
}
