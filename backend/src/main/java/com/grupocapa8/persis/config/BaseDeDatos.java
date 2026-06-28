/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Matias
 */
public class BaseDeDatos {
    
    private static final String URL = "jdbc:sqlite:db/persis.db";
    private static boolean schemaInicializado = false;
    
    public static Connection getConnection() throws SQLException {
        Connection con = DriverManager.getConnection(URL);
        inicializarSiNoExiste(con);
        return con;
    }
    
    private static void inicializarSiNoExiste(Connection con) throws SQLException {
        if (schemaInicializado) return;
        String sql = "SELECT count(*) FROM sqlite_master WHERE type='table' AND name='usuario'";
        
        try(Statement st = con.createStatement();
            ResultSet rs = st.executeQuery(sql)) {
            rs.next();
            
            if (rs.getInt(1) == 0) {
                construirSchema(con);
            }
        }
        schemaInicializado = true;
    }
    
    private static void construirSchema(Connection con) throws SQLException {
        try {
            Path archivo = Path.of("db/schema.sql");
            if (!Files.exists(archivo)) {
                throw new SQLException("No se encontró " + archivo.toAbsolutePath());
            }
            String sql = Files.readString(archivo, StandardCharsets.UTF_8);
            boolean autoCommit = con.getAutoCommit();
            con.setAutoCommit(false); // <- INICIO DE TRANSACCIÓN
            
            try (Statement st = con.createStatement()) {
                for (String sentencia : sql.split(";")) {
                    sentencia = sentencia.trim();
                    
                    if (!sentencia.isBlank()) {
                        st.execute(sentencia);
                    }
                }
                
                con.commit(); // <- FIN DE TRANSACCIÓN
            } catch (SQLException ex) {
                con.rollback();
                throw ex;
            } finally {
                con.setAutoCommit(autoCommit);
            }
        } catch (IOException ex) {
            throw new SQLException("No se pudo leer el schema: " + ex.getMessage(), ex);
        }
    }
    
}
