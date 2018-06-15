var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
require('dotenv').config();

var app = express();
var ejsLayouts = require('express-ejs-layouts');
var port = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);


// GET / - gets the main site index page
app.get('/', function(req, res) {
  res.render('index');
});

// GET /about - gets the main site about page
app.get('/about', function(req, res) {
  res.render('about');
});

// GET /articles - gets full articles list
app.get('/articles', function(req, res) {
  db.article.findAll().then(function(data) {
    res.render('articles/index', { articles: data });
  });
});

// GET /articles/new - returns form for new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  // TODO: Add db access code here.
  db.article.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(data) {
    console.log(data);
    res.redirect('/articles');
  });
});

// GET /articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  if (index >= 0) {
    db.article.find({
      where: {id: req.params.index}
    }).then(function(data) {
      res.render('articles/show', {article: data});
    }).catch(function(error) {
      res.send('RUH ROHHH!!!!');
    });
  } else {
    res.send('Error');
  }
});

// GET a specific article to edit
app.get('/articles/:index/edit', function(req, res) {
  db.article.find({
    where: {id: req.params.index}
  }).then(function(data) {
    res.render('articles/edit', {article: data});
  });
});

// PUT - edit a specific article
app.put("/articles/:index", function(req, res) {
  db.article.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {id: req.params.index}
  }).then(function(data) {
    res.send(data);
  })
});

// DELETE a specific article
app.delete("/articles/:index", function(req, res) {
  db.article.destroy({
    where: {id: req.params.index}
  }).then(function(data) {
    res.sendStatus(200);
  });
});

app.listen(port, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
