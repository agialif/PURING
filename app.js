var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')

dotenv.config();

var indexRouter = require("./routes/index");
//USERS
var signupRouter = require("./routes/users/signup");
var loginRouter = require("./routes/users/login");
var profileRouter = require("./routes/users/profile");
const confirmEmail = require("./routes/users/confirmEmail");

//ADMIN
var adminRouter = require("./routes/admin/admin");
var userRouter = require("./routes/admin/user-lists");

//MIDDLEWARE

var verifyUser = require("./middleware/validateUser");
var verifyAdmin = require("./middleware/validateAdmin");

//logout
var logoutRouter = require("./routes/logout");

//transaction
var {
  pinjamRouter,
  pinjamAdminRouter,
} = require("./routes/transactions/pinjam");

var balikinRouter = require("./routes/transactions/balikin");

var bookRouter = require("./routes/book/bookRoute");
var bookAdminRouter = require("./routes/book/bookAdminRoute");

var categoryRouter = require("./routes/Category/category");
var categoryAdminRouter = require("./routes/Category/categoryAdmin");


var sumbangBookRouter = require('./routes/sumbanganBooks/sumbanganBookRoute');
var sumbangBookAdminRouter = require('./routes/sumbanganBooks/sumbanganBookAdminRoute');

var sumbangCDRouter = require('./routes/sumbanganCD/sumbanganCDRoute');
var sumbangCDAdminRouter = require('./routes/sumbanganCD/sumbanganCDAdminRoute');

var app = express();

var url = process.env.DB_URI;
var connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
}); // added

connect.then(
  (db) => {
    //added
    console.log("Connection to MongoDB success");
  },
  (err) => {
    console.log("Connection error: ", err);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/", indexRouter);
//admin
app.use("/admin", adminRouter); //login as admin
app.use("/users", verifyAdmin, userRouter); //view all users data

//user
app.use("/signup", signupRouter); //user signup
app.use("/login", loginRouter); //login as user
app.use("/profile", verifyUser, profileRouter); //user profile
app.use("/confirmation", confirmEmail);

//logout both admin and users
app.use("/logout", logoutRouter);

//transactions

app.use("/admin/pinjam", verifyAdmin, pinjamAdminRouter);
app.use("/pinjam", verifyUser, pinjamRouter);
app.use("/admin/balikin", verifyAdmin, balikinRouter);

//book
app.use("/buku", bookRouter);
app.use("/admin/buku", verifyAdmin, bookAdminRouter);

//category
app.use("/kategori", categoryRouter);
app.use("/admin/kategori", verifyAdmin, categoryAdminRouter);

//sumbanganbuku
app.use('/sumbangBuku',verifyUser, sumbangBookRouter);
app.use('/admin/sumbang', verifyAdmin, sumbangBookAdminRouter);

//sumbanganCD
app.use('/sumbangCD', verifyUser,sumbangCDRouter);
app.use('/admin/sumbang', verifyAdmin, sumbangCDAdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
