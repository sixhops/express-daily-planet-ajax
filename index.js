var express = require('express');
var bodyParser = require('body-parser');
var db = require("./models");
var app = express();
var ejsLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

// var articles = [
//   { title: 'Bernie! Bernie!', body: '#feelthebern' },
//   { title: 'Trump for change!', body: 'Make America Great Again' },
//   { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
// ];

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
  // TODO: Add db access code here. find all
  db.article.findAll().then(function(data){
    res.render('articles/index', { articles: data });
  });
});

// GET /articles/new - returns form for new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

// POST /articles - create a new article from form data
app.post('/articles', function(req, res)  {
  // TODO: Add db access code here.
  db.article.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(data) {
    res.redirect('/articles');
  });
});

// GET /articles/:index - gets a specific article 
app.get('/articles/:index', function(req, res) {
  var index = req.params.index;
  db.article.find({
    where: {id: index}
  }).then(function(data) {
    res.render('articles/show', { article: data});
  });
});

// UPDATE form
app.get("/articles/:index/edit", function(req, res) {
  var index = req.params.index;
  db.article.find({
    where: {id: index}
  }).then(function(data) {
    res.render("articles/edit", {article: data});
  });
});

//PUT route
app.put("/articles/:index", function(req, res) {
  var index = req.params.index;
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

//DELETE route
app.delete("/articles/:index", function(req, res) {
  var index = req.params.index;
  db.article.destroy({
    where: {id: index}
  }).then(function(data) {
    console.log(data);
    res.send(data);
  });
})

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
