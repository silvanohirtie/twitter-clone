// @ts-nocheck
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userPost = require('../models/userPost.js')
var bodyParser = require('body-parser')
var JSAlert = require("js-alert");

require('dotenv/config');
mongoose.connect(
  process.env.DATABASE_CONNECTION,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },
  () => console.log('Connected to MongoDB\n')
)


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', function(req, res) {
  userPost.find().sort({"_id": -1}).find({}, (err, posts) => {
      if(err) throw err
  res.render('index.pug', {
    posts: posts
     })
  });
});

router.post('/', function(req, res) {
 console.log(Date.now())
 let post = new userPost()
 post.username = req.body.name
 post.content = req.body.content

 if(post.username == "" || post.content == "") {
console.log("Compile all the form")
res.redirect('/')
 } else {

  post.save(function (err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/')
    }

  })
}
});

router.get('/test', function(req, res) {
  userPost.find({}, (err, posts) => {
      if(err) throw err
      console.log(posts)
  res.render('test.pug', {
    
      test: posts
      
  })
  });
});

  router.get('/about', (req, res, next) => {
    res.render('about.pug');
  });


  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
module.exports = router;