/**
 * Modelo Cliente
 * Un cliente que pertenece a un usuario.
 * 
 * Relaciones:
 * - belongsTo Usuario (user_id)
 * - hasMany Proyecto (cliente_id)
 */

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING
  });

  Cliente.associate = (models) => {
    // Cada cliente pertenece a un usuario
    Cliente.belongsTo(models.Usuario, { foreignKey: 'user_id' });

    // Un cliente puede tener varios proyectos asociados
    Cliente.hasMany(models.Proyecto, { foreignKey: 'cliente_id' });
  };

  return Cliente;
};
