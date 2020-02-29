var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var middleware = require('./modules/middlewares')
const dotenv = require('dotenv')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home')
const emailRouter = require('./routes/email')

mongoose.connect('mongodb://localhost/trellofinal', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
},
(err) => {
  console.log('Connected', err ? false : true);
})
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config()

// app.use((req,res,next)=>{
//   console.log(req.path,"path");
//   next()
// })
app.use('/users', usersRouter);
app.use('/email', emailRouter)
// app.use(middleware.isAuthenticated)
app.use('/home', homeRouter)
// app.use((req,res,next)=>{
//   console.log(req.path,"path1");
//   next()
// })
app.use('/', indexRouter);
// app.use((req,res,next)=>{
//   console.log(req.path,"path2");
//   next()
// })

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
