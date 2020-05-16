// @ts-nocheck
const express = require('express')
var app = express()
const pageRouter = require('./routes/pages');
const path = require('path')
require('dotenv/config');

var errorHandler = require('express-error-handler'),
  handler = errorHandler({
    static: {
      '404': 'views/404.pug'
    }
  });

app.set('view-engine', 'pug')
app.set('views', path.join(__dirname,'views') )
app.use(express.static(__dirname + '/public'));
app.use('/', pageRouter)
app.post('/post', (req,res) => {
  console.log(req.body)
})
app.use( errorHandler.httpError(404) );
app.use( handler );

app.listen(3000, () => {
    console.log("Server started on localhost at port: 3000...")
 })