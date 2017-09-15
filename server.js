// main server code
const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();

// requiring our models
const { BlogPost, User } = require('./models');

// setting up our view engine
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

// establishing our public assets directory
app.use(express.static('public'));

// adding middleware to our requests so that
// we can easily retrieve the value of each 
// request's body (if it has one, like 
// in a post request)
app.use(bodyParser({ extended: false }));

// adding session middleware so that
// we can rely on a specific user
app.use(session({
  secret: 'asdfasfdadfadsfasdfaewawefaewfaefa',
  resave: false,
  saveUninitialized: true
}));

// routes
app.get('/', function (req, res) {
  if (req.session.userId === undefined) {
    res.redirect('/login');
  } else {
    BlogPost.findAll({ include: [User] }).then(function (data) { 
      res.render('index', { posts: data });
    });
  }
});

app.get('/login', function (req, res) { 
  res.render('login');
});

app.post('/login', function (req, res) {
  User.findOne({
    where: {
      name: req.body.user, 
      password: req.body.password 
    } 
  }).then(function (data) {
    if (data !== null) {
      console.log(data.id);
      req.session.userId = data.id;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
});

app.post('/posts', function (req, res) {
  if (req.session.userId !== undefined) {
    // find the user, and then do stuff
    User.findOne({ 
      where: { id: req.session.userId }}).then(function (user) { 
        let post = BlogPost.build({
          title: req.body.title,
          contents: req.body.content
        });

        post.save().then(function () { 
          post.setUser(user);
          res.redirect('/');
        });
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/posts/:id', function (req, res) {
  BlogPost.findOne( { 
    where: { id: req.params.id }, 
    include: [User] }).then(function (post) { 
      if (post !== undefined) {
        res.render('post', { post: post });
      } else {
        res.redirect('/');
      }
    });
});

// booting up server
app.listen(3000, function () {
  console.log('Server ready to roll at port 3000');
});