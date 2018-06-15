var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
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
  // TODO: Update this error checking to look at the database (or just remove it)
  // if (index < articles.length && index >= 0) {
    // TODO: Add db access code here.
    db.article.findOrCreate({
      where: {
        title: 'Bernie! Bernie!',
        body: '#feelthebern'  
      },
      defaults: {}
    }).spread(function(article, created) {
      console.log(article);
      res.render('articles/show', {article: article});
    });
  // } else {
  //   res.send('Error');
  // }
});

// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  // TODO: Add db access code here.
  db.user.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(data) {
    console.log(data);
    res.redirect('/articles');
  });
});

// TODO: PUT
app.put('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {index: index}
  }).then(function(data) {
    console.log(data);
    res.redirect('/articles');
  });
});

// TODO: DELETE
app.delete('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.destroy({
    where: {index: index}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
