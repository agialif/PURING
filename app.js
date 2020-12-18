var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/users/signup');
var userRouter = require('./routes/admin/user-lists');
var loginRouter = require('./routes/users/login');
//var verifyUser = require('./middleware/validateUser');
var verifyAdmin = require('./middleware/validateAdmin');
var adminRouter = require('./routes/admin/admin');

var bookRouter = require('./routes/book/bookRoute');
var bookAdminRouter = require('./routes/book/bookAdminRoute');

var categoryRouter = require('./routes/Category/category');
var categoryAdminRouter = require('./routes/Category/categoryAdmin');

var sumbangBookRouter = require('./routes/sumbanganBooks/sumbanganBookRoute');
var sumbangBookAdminRouter = require('./routes/sumbanganBooks/sumbanganBookAdminRoute');

var sumbangCDRouter = require('./routes/sumbanganCD/sumbanganCDRoute');
var sumbangCDAdminRouter = require('./routes/sumbanganCD/sumbanganCDAdminRoute');

var app = express();
var url = 'mongodb+srv://puring:puring123@cluster0.i9i6o.mongodb.net/puring?retryWrites=true&w=majority'; //added
var connect = mongoose.connect(url);

connect.then((db)=>{ //added
  console.log("Connection to MongoDB success");
}, (err)=>{
  console.log("Connection error: ", err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//admin
app.use('/admin', adminRouter);
app.use('/users',verifyAdmin, userRouter);

//user
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

//book
app.use('/buku', bookRouter);
app.use('/admin/buku', verifyAdmin, bookAdminRouter);

//category
app.use('/kategori',categoryRouter);
app.use('/admin/kategori',verifyAdmin, categoryAdminRouter);

//sumbanganbuku
app.use('/sumbangBuku',verifyUser, sumbangBookRouter);
app.use('/admin/sumbang', verifyAdmin, sumbangBookAdminRouter);

//sumbanganCD
app.use('/sumbangCD', verifyUser,sumbangCDRouter);
app.use('/admin/sumbang', verifyAdmin, sumbangCDAdminRouter);

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
