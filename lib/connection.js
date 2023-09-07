const Sequelize = require('sequelize');

const sequelize = new Sequelize('tu_base_de_datos', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
