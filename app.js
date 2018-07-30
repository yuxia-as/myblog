var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/home/index');
var usersRouter = require('./routes/admin/user');
var postRouter = require('./routes/home/post');
var adminRouter = require('./routes/admin/admin');
var categoryRouter = require('./routes/admin/category');
var articleRouter = require('./routes/admin/article');

var app = express();

//get session
var session = require('express-session');
app.use(session({
  secret:'blog',
  resave: false,
  saveUninitialized: true,
  cookie:{}
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));

app.use('/', indexRouter);
app.use('/admin/user', usersRouter);
app.use('/post', postRouter);
//router for backend admin page
app.use('/admin',checkLogIn);
app.use('/admin',adminRouter);
//router for backend admin/category page
app.use('/admin/category',checkLogIn);
app.use('/admin/category',categoryRouter);
//router for backend admin/article page
app.use('/admin/article',checkLogIn);
app.use('/admin/article',articleRouter);

//check if user has logged in
function checkLogIn(req,res,next){
  if(!req.session.isLogin){
    res.redirect('/admin/user/login');
  }
  next();
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

module.exports = app;
