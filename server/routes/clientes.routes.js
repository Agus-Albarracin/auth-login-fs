const express = require("express");
const router = express.Router();
const { getAll, create, update, remove, addProyecto} = require("../controller/clientes/clientes.controller");
const authenticateToken = require('../middles/token.middle')


// protección de token:
router.use(authenticateToken)

// rutas privadas
router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:clienteId/proyectos", addProyecto);

module.exports = router;
