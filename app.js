var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/homeRouter');
var userRouter= require('./routes/userRouter');
var productRouter = require('./routes/productRouter');
var traineeRouter = require('./routes/traineeRouter')
var cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.mongoURI;
const connect = mongoose.connect(url,{ useNewUrlParser: true });
var https = require('https');
const authenticate = require('./authenticate')

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();



//Cors Policy
app.use(
  cors({
    origin: "*",
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/trainee', traineeRouter);

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

module.exports = app;
