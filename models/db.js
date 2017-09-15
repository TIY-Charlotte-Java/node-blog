const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodeblog', 'Ben', '', { dialect: 'postgres' });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};