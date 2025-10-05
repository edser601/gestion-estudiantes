import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// Obtener todos los estudiantes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM estudiantes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Agregar un estudiante
router.post("/", async (req, res) => {
  try {
    const { nombre, edad, carrera } = req.body;
    const [result] = await pool.query(
      "INSERT INTO estudiantes (nombre, edad, carrera) VALUES (?, ?, ?)",
      [nombre, edad, carrera]
    );
    res.json({ id: result.insertId, nombre, edad, carrera });
  } catch (error) {
    res.status(500).json({ message: "Error al insertar" });
  }
});

// Modificar un estudiante
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, carrera } = req.body;
    const [result] = await pool.query(
      "UPDATE estudiantes SET nombre = ?, edad = ?, carrera = ? WHERE id = ?",
      [nombre, edad, carrera, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    res.json({ id, nombre, edad, carrera });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }
});

// Eliminar un estudiante
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "DELETE FROM estudiantes WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    res.json({ message: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});
// Obtener conteo de estudiantes por carrera
router.get("/carreras/conteo", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT carrera, COUNT(*) AS total
      FROM estudiantes
      GROUP BY carrera
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener conteo por carrera:", error);
    res.status(500).json({ message: "Error al obtener datos" });
  }
});
// Obtener estudiantes de una carrera específica
router.get("/carrera/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM estudiantes WHERE carrera = ?",
      [nombre]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estudiantes por carrera:", error);
    res.status(500).json({ message: "Error al obtener datos" });
  }
});



export default router;
