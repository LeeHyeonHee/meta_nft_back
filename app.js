var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var serverInfo = require('./server_conf.json');
var session = require("express-session");
var mySqlStore = require("express-mysql-session")(session);

const mysql = require('mysql');
var options = {
  host: serverInfo.dbHost,
  user: serverInfo.dbUserId,
  password: serverInfo.dbUserPwd,
  database: serverInfo.dbName,
  port: serverInfo.dbPort
}
const conn = mysql.createConnection(options)

var sessionStore = new mySqlStore(options);

conn.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected");
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nftRouter = require('./routes/NFT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/NFT', nftRouter);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
)

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
