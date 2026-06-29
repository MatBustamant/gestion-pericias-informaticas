/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupocapa8.persis.dao;

import com.grupocapa8.persis.config.BaseDeDatos;
import com.grupocapa8.persis.enums.TipoSolicitud;
import com.grupocapa8.persis.model.Causa;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Matias
 */
public class CausaDAO {

    public Causa buscarPorId(int id) {
        String sql = "SELECT * FROM Causa WHERE id_causa = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapear(rs);
            }
        } catch (SQLException ex) {
            System.getLogger(CausaDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return null;
    }

    public Causa buscarPorNumExpediente(String numExpediente) {
        String sql = "SELECT * FROM Causa WHERE num_Expediente = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, numExpediente);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapear(rs);
            }
        } catch (SQLException ex) {
            System.getLogger(CausaDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return null;
    }

    public List<Causa> buscarTodos() {
        List<Causa> lista = new ArrayList<>();
        String sql = "SELECT * FROM Causa";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        } catch (SQLException ex) {
            System.getLogger(CausaDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return lista;
    }

    public int insertar(Causa causa) {
        String sql = "INSERT INTO Causa (num_Expediente, delito, tipo, imputados, victimas) VALUES (?, ?, ?, ?, ?)";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, causa.getNumExpediente());
            ps.setString(2, causa.getDelito());
            ps.setString(3, causa.getTipo().toString().toLowerCase());
            ps.setString(4, causa.getImputados());
            ps.setString(5, causa.getVictimas());
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) return rs.getInt(1);
            }
        } catch (SQLException ex) {
            System.getLogger(CausaDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return -1;
    }

    public void actualizar(Causa causa) {
        String sql = "UPDATE Causa SET delito = ?, imputados = ?, victimas = ? WHERE id_causa = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, causa.getDelito());
            ps.setString(2, causa.getImputados());
            ps.setString(3, causa.getVictimas());
            ps.setInt(4, causa.getId());
            ps.executeUpdate();
        } catch (SQLException ex) {
            System.getLogger(CausaDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
    }

    public void eliminar(int id) {
        String sql = "DELETE FROM Causa WHERE id_causa = ?";
        try (Connection con = BaseDeDatos.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException ex) {
            System.getLogger(CausaDAO.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
    }

    private Causa mapear(ResultSet rs) throws SQLException {
        return new Causa(
            rs.getInt("id_causa"),
            rs.getString("num_Expediente"),
            rs.getString("delito"),
            TipoSolicitud.valueOf(rs.getString("tipo").toUpperCase()),
            rs.getString("imputados"),
            rs.getString("victimas")
        );
    }
}
