const db = require("../../models");
const Cliente = db.Cliente;
const Proyecto = db.Proyecto;

/** 
 * getAll necesita informar que si el cliente no contiene proyectos devuelva un mensaje en lugar de un error.
 * por qué? Porque Sequelize por defecto va informarte como si se tratara de un error que la relacion entre Cliente
 * y Proyectos esta vacía.
 * **/
const getAll = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          association: "proyectos",
          required: false,
        },
      ],
    });

    if (!clientes.length) {
      return res.json({ message: "Todavía no hay clientes" });
    }

    res.json(clientes); 
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error: error.message });
  }
};


const create = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al crear cliente", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.update(req.body, { where: { id } });
    const updated = await Cliente.findByPk(id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.destroy({ where: { id } });
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error: error.message });
  }
};

const addProyecto = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    const proyecto = await Proyecto.create({ ...req.body, clienteId });
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar proyecto", error: error.message });
  }
};

module.exports = { getAll, create, update, remove, addProyecto}
