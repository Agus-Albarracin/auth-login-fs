const express = require('express');
const router = express.Router();
const authenticateToken = require('../middles/token.middle')
const {  createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario} = require('../controller/usuarios/usuarios.controller');

//protección de token
router.use(authenticateToken)

//rutas privadas
router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.put('/', updateUsuario);
router.delete('/', deleteUsuario);

module.exports = router;
