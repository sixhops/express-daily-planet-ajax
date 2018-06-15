var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var app = express();
var db = require('./models');
var layouts = require('express-ejs-layouts');
var port = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.use(layouts);

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
  db.article.findAll().then(function(articles){
    res.render('articles/index', { articles: articles });
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
  }).then( function(article) {
    res.redirect('/articles');
  })
});

// GET /articles/:index - gets a specific article SHOW
app.get('/articles/:index', function (req, res) {
  var index = parseInt(req.params.index);
  // TODO: update error checking because there is no articles object
  db.article.find({
    where: { id: index }
  }).then(function (article) {
    if (article !== null) {
      res.render('articles/show', { article: article });
    } else {
      res.sendFile(__dirname + '/static/404.html');
    }
  })
});

//TODO  ADD PUT & DELETE ROUTES
app.get('/articles/:index/edit', function(req,res) {
  // TODO: update error checking because there is no articles object
  db.article.find({
    where: { id: req.params.index }
  }).then( function(article) {
    res.render('articles/edit', {article: article});
  })
})

app.put('/articles/:index', function(req,res) {
  db.article.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {id: req.params.index}
  }).then( function(data) {
    console.log(data);
    res.send(data)
  })
})

app.delete( '/articles/:index', function(req,res) {
  db.article.destroy({
    where: {id: req.params.index}
  }).then( function(data) {
    console.log(data);
    res.sendStatus(200);
  })
})

app.get('*', function(req,res) {
  res.sendFile(__dirname + '/static/404.html');
})

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port " + port + " in the morning");
});
