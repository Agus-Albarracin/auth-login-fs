const db = require('../../models');
const Usuario = db.Usuario;


const createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Usuario.update(req.body, {
      where: { id }
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado o sin cambios' });
    }

    const usuarioActualizado = await Usuario.findByPk(id);
    res.json(usuarioActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Usuario.destroy({
      where: { id }
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
