var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);


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
    res.render('articles/index', { articles: data });
  });
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
    res.redirect('/articles');
  });
});

// GET /articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
    db.article.find({
      where: {id: index}
    }).then(function(data) {
      res.render('articles/show', { article: data });
    })
});

// UPDATE ONE
app.get('/articles/:id/edit', function(req, res) {
  var index = parseInt(req.params.id);
  db.article.find({
    where: {id: index}
  }).then(function(data) {
    res.render('articles/edit', { article: data });
  });
});

app.put('/articles/:id', function(req, res) {
  db.article.update({ 
    title: req.body.title,
    body: req.body.body
  }, { // where clause
    where: {id: req.params.id}
  }).then(function(data) {
    res.json(data);
  });
});


// DELETE
app.delete('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.destroy({
    where: {id: index}
  }).then(function(data) {
    res.sendStatus(200);
  });
});

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
