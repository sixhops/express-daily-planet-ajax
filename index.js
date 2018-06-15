
var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models')
var app = express();
var port = process.env.PORT || 2000;


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

// GET /articles - gets full articles list
app.get('/articles', function(req, res) {
  db.article.findAll().then(function(data) {
    res.render('articles/index', { articles: data });
  });
});

// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  db.article.create({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  }).then(function(data) {
    //console.log(data);
    res.redirect('/articles');
  });
});


// GET /articles/new - returns form for new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

// GET ONE/articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.find({
    where: {id: req.params.index}
 }).then(function(data) {
   console.log(data);
   if(data != null){
     res.render('articles/show', { article: data });
   } else {
     res.render('articles/404');
   }
  })
});

//<---------------Create New---------------->

//<---------------Create New End---------------->

//<---------------Update Route----------------->
// app.get('/articles/:id/edit', function(req, res) {
//   console.log('in the edit route!');
//   db.article.find({
//     where: {id: req.params.id}
//   }).then(function(data) {
//     console.log('in the edit data route!')
//     res.render('articles/edit', {user: data});
//   });
// });
//
// app.put('/articles/:id', function(req, res) {
//   db.artcile.update({
//     title: req.body.title,
//     body: req.body.body,
//     //createdAt: req.body.createdAt,
//     //updatedAt: req.body.updatedAt
//   }, {
//     where: {id: req.params.id}
//   }).then(function(data) {
//     console.log(data);
//     res.send(data);
//   });
// });
// //<---------------Update Route End-------------------->
//
// //<--------------Delete Route-------------->
// app.delete('/articles/:id', function(req,res) {
//   db.article.destroy({
//     where: {id: req.params.id}
//   }).then(function(data) {
//     console.log(data);
//     res.sendStatus(200);
//   });
// });
//<--------------Delete Route End-------------->


app.listen(port, function() {
    console.log("You're listening to the smooth sounds of port " + port + " in the morning");
});
