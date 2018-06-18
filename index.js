var express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();
var db = require('./models')
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var port= process.env.PORT || 2000;

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
  // TODO: Add db access code here.
db.article.findAll().then(function(data){
  console.log(data);
  res.render('articles/index', { articles: data });
})

});
// POST /articles - create a new article from form data
app.post('/articles', function(req, res) {
  // TODO: Add db access code here.
  db.article.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(data){
    res.redirect('/articles');
  });
});
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});
// GET /articles/:index - gets a specific article
app.get('/articles/:index/edit', function(req, res){
  var index = parseInt(req.params.index);
  db.article.find({
    where: {id: index}}).then(function(data){
      res.render('articles/edit', {article: data})
  })
});


app.get('/articles/:index', function(req, res) {


  var index = parseInt(req.params.index);
//TODO Update this error checking to look at the database (or just remove it)

    // TODO: Add db access code here.
    db.article.find({
      where: {id: req.params.index}
    }).then(function(data){
      // console.log(data)
      if(data != null){

  res.render('articles/show', { article: data });

}else {
  res.render('articles/404');
}

    })


});


app.put('/articles/:index', function(req, res){
  db.article.update({
    title: req.body.title,
    body:  req.body.body
  }, {
    where: {id: req.params.index}
  }).then(function(data){
    res.send('you did it!')
  })
})

app.delete('/articles/:idex', function(req, res){
  db.article.destroy({
    where: {id: req.params.idex}

  }).then(function(data){
    console.log(data)
    res.sendStatus(200);
  })
})
// GET /articles/new - returns form for new article

// POST /articles - create a new article from form data


app.listen(port, function() {
    console.log("You're listening to the smooth sounds of" +port+ "in the morning");
});
