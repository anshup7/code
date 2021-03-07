require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
// var authMiddleware = require('./auth');
var globalRoutes = require('./globalRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(process.env.save_path));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(authMiddleware);

// routes

for (let eachRoute of globalRoutes) {
  app.use(eachRoute.path, eachRoute.handler);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(1010, () => console.log("Server Started at port 1010"));

module.exports = app;
