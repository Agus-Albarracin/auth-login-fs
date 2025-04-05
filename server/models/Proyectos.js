/**
 * Modelo Proyecto
 * Proyectos asignados a un cliente.
 * 
 * Relaciones:
 * - belongsTo Cliente (cliente_id)
 */

module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define('Proyecto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM('pendiente', 'en progreso', 'completado'),
      defaultValue: 'pendiente'
    },
    fecha_inicio: DataTypes.DATE,
    fecha_entrega: DataTypes.DATE
  });

  Proyecto.associate = (models) => {
    // Cada proyecto pertenece a un cliente
    Proyecto.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'client', });
  };

  return Proyecto;
};
