/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.grupocapa8.persis;

import com.grupocapa8.persis.config.BaseDeDatos;
import java.io.IOException;
import java.net.URI;
import java.sql.SQLException;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

/**
 *
 * @author Matias
 */
public class App {

    public static final URI BASE_URI = URI.create("http://localhost:8080/api");

    public static void main(String[] args) {
        try {
            System.out.println("Iniciando servidor PERSIS...");

            // Se configura con la clase o el paquete donde están los recursos.
            final ResourceConfig resourceConfig = new ResourceConfig()
                    .packages("com.grupocapa8.persis.controller");

            // Con esto se configura el arranque del servidor Grizzly
            final HttpServer server = GrizzlyHttpServerFactory.createHttpServer(BASE_URI, resourceConfig, false);

            // Con esto, si la JVM se detiene, nos aseguramos de que el servidor Grizzly cierre todas las conexiones de forma correcta.
            Runtime.getRuntime().addShutdownHook(new Thread(() -> server.shutdownNow()));

            // Con esto arrancamos el servidor Grizzly
            server.start();
            
            BaseDeDatos.getConnection();
            System.out.println("Base de datos inicializada.");

            System.out.println(String.format("Servidor iniciado.\nAPI disponible en %s\nPresione CTRL+C para detener.",
                    BASE_URI));

            // Para que no termine la ejecución cuando estas líneas acaban
            Thread.currentThread().join();
        } catch (IOException | SQLException | InterruptedException ex) {
            System.getLogger(App.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
    }
}
