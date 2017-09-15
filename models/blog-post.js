const { Sequelize, sequelize } = require('./db');

const BlogPost = sequelize.define('blogpost', {
  title: { required: true, type: Sequelize.STRING },
  contents: { required: true, type: Sequelize.STRING }
});

module.exports = BlogPost;