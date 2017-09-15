const { Sequelize, sequelize } = require('./db');

const User = sequelize.define('user', {
  name: { required: true, type: Sequelize.STRING },
  password: { required: true, type: Sequelize.STRING }
});

module.exports = User;