var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let oldPlayerRouter = require('./routes/oldPlayer.route');
let newPlayer = require('./routes/newPlayer.route')

//script

let getNewPlayer = require('./scripts/getNewPlayers-Teams');
let getLatest =require('./scripts/getLatest')


let mongoose = require('mongoose')

require('dotenv').config();

var app = express();

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
app.use('/api/oldplayer', oldPlayerRouter );
app.use('/api/newPlayer', newPlayer)
// app.use('/api/competitions', compeRouter)


//conect mongoose

mongoose.connect(process.env.remoteDb,  { useNewUrlParser: true }, function(err, db){
  if(err) throw err
  console.log("connected to remote db");
  database=db

})
//get player data
//getNewPlayer.makeRequest();
getLatest.makeRequest();

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
