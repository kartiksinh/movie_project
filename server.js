 
var logger = require('morgan');
var express = require('express');
var movieRoutes = require('./routes/movie-crud');
var cityRoutes = require('./routes/city-crud');
var theatreRoutes = require('./routes/theatre-crud');
var timingRoutes = require('./routes/timing-crud');
var showRoutes = require('./routes/show-crud');

var bodyParser=require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/movie', movieRoutes);
app.use('/city', cityRoutes);
app.use('/theatre', theatreRoutes);
app.use('/timing', timingRoutes);
app.use('/show', showRoutes);


// Only load this middleware in dev mode (important).
if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));

}



var server = app.listen(8000, function () {
  console.log('listening on port 8000');
});