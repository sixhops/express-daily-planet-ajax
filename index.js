var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

// GET / - gets the main site index page
app.get('/', function(req, res) {
  res.render('index');
});

// GET /about - gets the main site about page
app.get('/about', function(req, res) {
  res.render('about');
});

// GET /articles - gets full articles list (find all)
app.get('/articles', function(req, res) {
  // TODO: Add db access code here.
  db.article.findAll().then(function(data) {
    res.render('articles/index', { articles: data });
  });
});

// GET /articles/new - returns form for new article
app.get('/articles/new', function (req, res) {
  res.render('articles/new');
});

// GET /articles/:index - gets a specific article (get one)
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  // TODO: Add db access code here.
  db.article.find({
    where: {id: index}
  }).then(function(data) {
    if(data != null) {
      res.render('articles/show', {article: data});
    }else {
      res.render('articles/404');
    }
  });
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

// GET /articles/:id/edit - returns form to edit a specific article
app.get('/articles/:index/edit', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.find({
    where: {id: index}
  }).then(function(data) {
    res.render('articles/edit', {article: data});
  });
});

// PUT /articles/ - updates article
app.put('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {id: index}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});

// DELETE /articles/:index - deletes a specific article
app.delete('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.destroy({
    where: {id: index}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
