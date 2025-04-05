const { Proyecto } = require("../../models");

/**
 * Usamos cliente_id como lo definimos en los modelos.
 * **/
const getProyectosByCliente = async (req, res) => {
  try {
    const { cliente_id } = req.query;
    if (!cliente_id) {
      return res.status(400).json({ error: "cliente_id es requerido" });
    }

    const proyectos = await Proyecto.findAll({
      where: { cliente_id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          association: "client",
          attributes: ["id", "nombre", "correo"],
        },
      ],
    });

    res.json(proyectos);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
};

const createProyecto = async (req, res) => {
  try {
    const { nombre, descripcion, estado, fecha_inicio, fecha_entrega, cliente_id } = req.body;

    if (!cliente_id) {
      return res.status(400).json({ error: "clienteId es requerido" });
    }

    const nuevoProyecto = await Proyecto.create({
      nombre,
      descripcion,
      estado,
      fecha_inicio,
      fecha_entrega,
      cliente_id,
    });

    res.status(201).json(nuevoProyecto);
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({ error: "Error al crear proyecto" });
  }
};

const updateProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Proyecto.update(req.body, { where: { id } });

    if (!actualizado) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    const proyectoActualizado = await Proyecto.findByPk(id);
    res.json(proyectoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar proyecto" });
  }
};

const deleteProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Proyecto.destroy({ where: { id } });

    if (!eliminado) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.json({ mensaje: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar proyecto" });
  }
};


module.exports = {getProyectosByCliente, createProyecto, updateProyecto, deleteProyecto}