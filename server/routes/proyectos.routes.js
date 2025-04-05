const express = require("express");
const router = express.Router();
const {
  getProyectosByCliente,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} = require("../controller/proyectos/proyectos.controller");
const authenticateToken = require('../middles/token.middle')

// Protección de token
router.use(authenticateToken)

// Rutas privadas
router.get("/", getProyectosByCliente);
router.post("/", createProyecto);
router.put("/:id", updateProyecto);
router.delete("/:id", deleteProyecto);

module.exports = router;