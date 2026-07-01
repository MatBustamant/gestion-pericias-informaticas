/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.config;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;

/**
 *
 * @author Matias
 */
@Provider
public class FiltroCors implements ContainerResponseFilter{

    @Override
    public void filter(ContainerRequestContext request, ContainerResponseContext response) throws IOException {
        if (!response.getHeaders().containsKey("Access-Control-Allow-Origin")) {
            response.getHeaders().add("Access-Control-Allow-Origin", "*");
        }
        if (!response.getHeaders().containsKey("Access-Control-Allow-Methods")) {
            response.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        }
        if (!response.getHeaders().containsKey("Access-Control-Allow-Headers")) {
            response.getHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        }
    }
    
}
