/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.dao;

import com.grupocapa8.persis.config.BaseDeDatos;
import com.grupocapa8.persis.enums.EstadoSolicitud;
import com.grupocapa8.persis.enums.TipoSolicitud;
import com.grupocapa8.persis.enums.Urgencia;
import com.grupocapa8.persis.model.Causa;
import com.grupocapa8.persis.model.Solicitud;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Matias
 */
public class SolicitudDAO {

    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public Solicitud buscarPorId(int id) {
        String sql = "SELECT * FROM Solicitud WHERE id_solicitud = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapear(rs);
            }
        } catch (SQLException ex) {
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return null;
    }

    public Solicitud buscarPorNumInterno(int numInterno, int anio, String tipo) {
        String sql = "SELECT * FROM Solicitud WHERE num_interno = ? AND anio = ? AND tipo = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, numInterno);
            ps.setInt(2, anio);
            ps.setString(3, tipo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapear(rs);
            }
        } catch (SQLException ex) {
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return null;
    }

    public List<Solicitud> buscarTodos() {
        List<Solicitud> lista = new ArrayList<>();
        String sql = "SELECT * FROM Solicitud";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        } catch (SQLException ex) {
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return lista;
    }

    public Solicitud insertar(Solicitud s, List<Integer> peritosIds, String tareasSolicitadas) {
        Connection con = null;
        try {
            con = BaseDeDatos.getConnection();
            con.setAutoCommit(false);

            // 1. Generar num_interno desde Contador_Solicitud
            String sqlCont = "INSERT INTO Contador_Solicitud (tipo, anio, ultimo) VALUES (?, ?, 0) "
                    + "ON CONFLICT(tipo, anio) DO UPDATE SET ultimo = ultimo + 1 RETURNING ultimo";
            try (PreparedStatement ps = con.prepareStatement(sqlCont)) {
                ps.setString(1, s.getTipo().toString().toLowerCase());
                ps.setInt(2, s.getAño());
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    s.setNumInterno(rs.getInt("ultimo"));
                }
            }

            // 2. Insertar solicitud
            String sql = "INSERT INTO Solicitud (id_causa, num_interno, tipo, anio, circunscripcion, "
                    + "descripcion_secuestros, urgencia, estado, fecha_hora_agendada, fiscal_solicitante) "
                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                ps.setInt(1, s.getCausa().getId());
                ps.setInt(2, s.getNumInterno());
                ps.setString(3, s.getTipo().toString().toLowerCase());
                ps.setInt(4, s.getAño());
                ps.setString(5, s.getCircunscripcion());
                ps.setString(6, s.getDescripcionSecuestros());
                ps.setString(7, s.getUrgencia().toString().toLowerCase());
                String estadoDb = s.getEstado().toString().toLowerCase().replace('_', '-');
                ps.setString(8, estadoDb);
                if (s.getFechaApertura() != null) {
                    ps.setString(9, DTF.format(LocalDateTime.ofInstant(s.getFechaApertura(), ZoneOffset.UTC)));
                } else {
                    ps.setString(9, null);
                }
                ps.setString(10, s.getFiscalSolicitante());
                ps.executeUpdate();
                try (ResultSet rs = ps.getGeneratedKeys()) {
                    if (rs.next()) s.setId(rs.getInt(1));
                }
            }

            // 3. Insertar tarea
            if (tareasSolicitadas != null && !tareasSolicitadas.isBlank()) {
                try (PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO Tarea (id_solicitud, descripcion) VALUES (?, ?)")) {
                    ps.setInt(1, s.getId());
                    ps.setString(2, tareasSolicitadas);
                    ps.executeUpdate();
                }
            }

            // 4. Insertar peritos
            if (peritosIds != null) {
                try (PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO Usuario_Solicitud (id_solicitud, id_usuario) VALUES (?, ?)")) {
                    for (Integer pid : peritosIds) {
                        ps.setInt(1, s.getId());
                        ps.setInt(2, pid);
                        ps.executeUpdate();
                    }
                }
            }

            con.commit();
            return s;
        } catch (SQLException ex) {
            try { if (con != null) con.rollback(); } catch (SQLException e) { /* ignore */ }
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
            return null;
        } finally {
            try { if (con != null) { con.setAutoCommit(true); con.close(); } } catch (SQLException e) { /* ignore */ }
        }
    }

    public void actualizar(Solicitud s, List<Integer> peritosIds, String tareasSolicitadas) {
        Connection con = null;
        try {
            con = BaseDeDatos.getConnection();
            con.setAutoCommit(false);

            // 1. Actualizar solicitud
            String sql = "UPDATE Solicitud SET id_causa = ?, circunscripcion = ?, descripcion_secuestros = ?, "
                    + "urgencia = ?, estado = ?, fecha_hora_agendada = ?, fiscal_solicitante = ? "
                    + "WHERE id_solicitud = ?";
            try (PreparedStatement ps = con.prepareStatement(sql)) {
                ps.setInt(1, s.getCausa().getId());
                ps.setString(2, s.getCircunscripcion());
                ps.setString(3, s.getDescripcionSecuestros());
                ps.setString(4, s.getUrgencia().toString().toLowerCase());
                String estadoDb = s.getEstado().toString().toLowerCase().replace('_', '-');
                ps.setString(5, estadoDb);
                if (s.getFechaApertura() != null) {
                    ps.setString(6, DTF.format(LocalDateTime.ofInstant(s.getFechaApertura(), ZoneOffset.UTC)));
                } else {
                    ps.setString(6, null);
                }
                ps.setString(7, s.getFiscalSolicitante());
                ps.setInt(8, s.getId());
                ps.executeUpdate();
            }

            // 2. Reemplazar tareas (delete + insert)
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM Tarea WHERE id_solicitud = ?")) {
                ps.setInt(1, s.getId());
                ps.executeUpdate();
            }
            if (tareasSolicitadas != null && !tareasSolicitadas.isBlank()) {
                try (PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO Tarea (id_solicitud, descripcion) VALUES (?, ?)")) {
                    ps.setInt(1, s.getId());
                    ps.setString(2, tareasSolicitadas);
                    ps.executeUpdate();
                }
            }

            // 3. Reemplazar peritos (delete + insert)
            try (PreparedStatement ps = con.prepareStatement(
                    "DELETE FROM Usuario_Solicitud WHERE id_solicitud = ?")) {
                ps.setInt(1, s.getId());
                ps.executeUpdate();
            }
            if (peritosIds != null) {
                try (PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO Usuario_Solicitud (id_solicitud, id_usuario) VALUES (?, ?)")) {
                    for (Integer pid : peritosIds) {
                        ps.setInt(1, s.getId());
                        ps.setInt(2, pid);
                        ps.executeUpdate();
                    }
                }
            }

            con.commit();
        } catch (SQLException ex) {
            try { if (con != null) con.rollback(); } catch (SQLException e) { /* ignore */ }
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        } finally {
            try { if (con != null) { con.setAutoCommit(true); con.close(); } } catch (SQLException e) { /* ignore */ }
        }
    }

    public void eliminar(int id) {
        Connection con = null;
        try {
            con = BaseDeDatos.getConnection();
            con.setAutoCommit(false);
            try (Statement st = con.createStatement()) {
                st.execute("DELETE FROM Usuario_Solicitud WHERE id_solicitud = " + id);
                st.execute("DELETE FROM Tarea WHERE id_solicitud = " + id);
                st.execute("DELETE FROM Solicitud WHERE id_solicitud = " + id);
            }
            con.commit();
        } catch (SQLException ex) {
            try { if (con != null) con.rollback(); } catch (SQLException e) { /* ignore */ }
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        } finally {
            try { if (con != null) { con.setAutoCommit(true); con.close(); } } catch (SQLException e) { /* ignore */ }
        }
    }

    public int contarPorCausa(int idCausa) {
        String sql = "SELECT count(*) FROM Solicitud WHERE id_causa = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idCausa);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt(1);
            }
        } catch (SQLException ex) {
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return 0;
    }

    public List<Integer> buscarPeritosIds(int idSolicitud) {
        List<Integer> ids = new ArrayList<>();
        String sql = "SELECT id_usuario FROM Usuario_Solicitud WHERE id_solicitud = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitud);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) ids.add(rs.getInt("id_usuario"));
            }
        } catch (SQLException ex) {
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return ids;
    }
    
    public String buscarTareas(int idSolicitud) {
        List<String> descs = new ArrayList<>();
        String sql = "SELECT descripcion FROM Tarea WHERE id_solicitud = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitud);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) descs.add(rs.getString("descripcion"));
            }
        } catch (SQLException ex) {
            System.getLogger(SolicitudDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return descs.isEmpty() ? "" : String.join("; ", descs);
    }
    
    private Solicitud mapear(ResultSet rs) throws SQLException {
        Causa causa = new Causa();
        causa.setId(rs.getInt("id_causa"));

        Solicitud s = new Solicitud();
        s.setId(rs.getInt("id_solicitud"));
        s.setCausa(causa);
        s.setNumInterno(rs.getInt("num_interno"));
        s.setTipo(TipoSolicitud.valueOf(rs.getString("tipo").toUpperCase()));
        s.setAño(rs.getInt("anio"));
        s.setCircunscripcion(rs.getString("circunscripcion"));
        s.setDescripcionSecuestros(rs.getString("descripcion_secuestros"));
        s.setUrgencia(Urgencia.valueOf(rs.getString("urgencia").toUpperCase()));
        String estadoDb = rs.getString("estado");
        s.setEstado(EstadoSolicitud.valueOf(estadoDb.replace('-', '_').toUpperCase()));
        String fechaStr = rs.getString("fecha_hora_agendada");
        if (fechaStr != null) {
            s.setFechaApertura(LocalDateTime.parse(fechaStr, DTF).toInstant(ZoneOffset.UTC));
        }
        s.setFiscalSolicitante(rs.getString("fiscal_solicitante"));
        return s;
    }
}
