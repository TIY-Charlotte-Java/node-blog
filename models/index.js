const BlogPost = require('./blog-post');
const User = require('./user');

BlogPost.belongsTo(User);
User.hasMany(BlogPost);

User.sync().then(function () { 
  BlogPost.sync(); 
});

module.exports = {
  BlogPost: BlogPost,
  User: User
};