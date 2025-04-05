/**
 * Configura y exporta los modelos Sequelize y la conexión a la base de datos.
 */

const Sequelize = require('sequelize');
const dbConfig = require('../dbConfig/dbConfig');

const db = {};

// Instancia y configuración de conexión
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Instancia de Sequelize y el constructor para el objeto "db"
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Modelos del sistema
db.Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
db.Cliente = require('./Cliente')(sequelize, Sequelize.DataTypes);
db.Proyecto = require('./Proyectos')(sequelize, Sequelize.DataTypes);

// Ejecuta asociaciones si están definidas en los modelos
for (const model of Object.values(db)) {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
}

module.exports = db;
