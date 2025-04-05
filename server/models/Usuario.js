/**
 * Modelo Usuario
 * Representa un usuario del sistema con su email y contraseña hasheada.
 * 
 * Relaciones:
 * - hasMany Cliente (user_id)
 */

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Usuario.associate = (models) => {
    // Un usuario puede tener varios clientes asociados
    Usuario.hasMany(models.Cliente, { foreignKey: 'user_id' });
  };

  return Usuario;
};
