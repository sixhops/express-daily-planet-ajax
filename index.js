var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var ejsLayouts = require("express-ejs-layouts");
var app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

var articles = [
  { title: 'Bernie! Bernie!', body: '#feelthebern' },
  { title: 'Trump for change!', body: 'Make America Great Again' },
  { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
];

// GET / - gets the main site index page
app.get('/', function(req, res) {
  res.render('index');
});

// GET /about - gets the main site about page
app.get('/about', function(req, res) {
  res.render('about');
});

// GET /articles - gets full articles list
app.get('/articles/', function(req, res) {
  db.article.findAll().then(function(data) {
  res.render('articles/index', { articles: articles });
});
});


// GET /articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
    // TODO: update this error checking to look at the database (or just remove it)
  if (index < articles.length && index >= 0) { 
    // TODO: Add db access code here.
    res.render('articles/show', { article: articles[req.params.index] });
  } else {
    res.render('articles/new');
  }
});

// GET /articles/new - returns form for new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  db.article.create({
    title: req.body.title,
    body: req.body.body 
  }).then(function(data) {
    console.log(data);
    articles.push({title: req.body.title, body: req.body.body});
    res.redirect('/articles');
  });
});

// GET edit - returns form for editing article
app.get('/articles/edit/:id', function(req, res) {
  res.render('articles/edit/:id');
});

app.delete('/articles/:id', function(req, res) {
  db.article.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    article.splice(req.params.id, 1);
    console.log(data);
    console.log('fart');
    res.sendStatus(200);
  })
});

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
