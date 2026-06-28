/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

/**
 *
 * @author Matias
 */
@Path("/test")
public class TestResource {
    @GET
    public String ping() {
        return "pong";
    }
}
