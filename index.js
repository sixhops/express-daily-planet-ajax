var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();
var ejsLayouts = require('express-ejs-layouts');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
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
  db.article.findAll().then(function(data) {
  res.render('articles/index', {articles: data});
});
});


// GET /articles/new - returns form for new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});



// GET /articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.find({
     where: {id: index}
     }).then(function(data) {
      res.render('articles/show', { article: data });
 });
});

app.get('/articles/:index/edit', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.find({
     where: {id: index}
     }).then(function(data) {
      res.render('articles/edit', { article: data, id: index});
 });
});



// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  db.article.create({
      title: req.body.title,
      body: req.body.body,
  }).then(function(data) {
    console.log(data);
  res.redirect('/articles');
});
});

app.delete('/articles/:id', function(req, res) {
    db.article.destroy({
      where: {id: req.params.id }
    })
    .then(function(data) {
      console.log(data);
      res.redirect('/articles');
  })
});

app.put('/articles/:id', function(req, res) {
    db.article.update({
      title: req.body.title,
      body: req.body.body
    }, {
      where: {id: req.params.id}
    }).then(function(data) {
      res.redirect('/articles/:id');
  })
});

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
