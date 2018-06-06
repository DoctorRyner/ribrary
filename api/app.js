var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let MongoClient = require('mongodb').MongoClient

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express()
let db

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const port = 3001

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
// db
// MongoClient.connect('mongodb://localhost:27017/sample', (err, database) => {
// 	if(err) return console.log(err)
// 	db = database

// 	const port = 3001

// 	app.listen(port, function () {
// 	console.log('Example app listening on port ' + port + '!');
// 	});
// })

module.exports = app;
