var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models')
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
  //findall route
  res.render('about');
});

// GET /articles - gets full articles list
app.get('/articles', function(req, res) {
  db.article.findAll().then(function(data) {
    res.render('articles/index', { articles: articles });  //or {articles: data}
  });
});


// GET ONE/articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.find({
    where: {id: index}
    console.log("GET one!");
  }).then(function(data) {
  if (index <= index.length){
  //if (index < articles.length && index >= 0) {
    res.render('articles/show', { article: articles[req.params.index] });  // or {article: data}
  } else {
    res.send('Error');
    }
  }
});

//<---------------Create New---------------->
// GET /articles/new - returns form for new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  db.article.create({
    title: req.body.title,
    body: req.body.body,
    //createdAt: req.body.createdAt,
    //updatedAt: req.body.updatedAt
  }).then(function(data) {
    console.log(data);
  // TODO: Add db access code here.
    res.redirect('/articles');
  });
});
//<---------------Create New End---------------->

//<---------------Update Route----------------->
app.get('/articles/:id/edit', function(req, res) {
  console.log('in the edit route!');
  db.article.find({
    where: {id: req.params.id}
  }).then(function(data) {
    console.log('in the edit data route!')
    res.render('articles/edit', {user: data});
  });
});

app.put('/articles/:id', function(req, res) {
  db.artcile.update({
    title: req.body.title,
    body: req.body.body,
    //createdAt: req.body.createdAt,
    //updatedAt: req.body.updatedAt
  }, {
    where: {id: req.params.id}
  }).then(function(data) {
    console.log(data);
    res.send(data);
  });
});
//<---------------Update Route End-------------------->

//<--------------Delete Route-------------->
app.delete('/articles/:id', function(req,res) {
  db.article.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});
//<--------------Delete Route End-------------->


app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
