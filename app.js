var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");

var mongo = require("mongodb");
var monk = require("monk");
//var db = monk("localhost:27017/garage");
var db = monk(process.env.MONGO_DB_ATLAS);

// var indexRouter = require('./routes/index');
var usersRouter = require("./routes/users");
var carDepotRouter = require("./routes/carDepot");
var carRouter = require("./routes/car");
var garageRouter = require("./routes/garage");
var expensesRouter = require("./routes/expenses");
var chargeDetailRouter = require("./routes/chargeDetail");
var carReceptionRouter = require("./routes/carReception");
var carRepairRouter = require("./routes/carRepair");
var carProblemRouter = require("./routes/carProblem");
var invoiceRouter = require("./routes/invoice");
var sendMailRouter = require("./routes/sendMail");

var app = express();
app.set("port", process.env.PORT || 3000);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(function (req, res, next) {
  req.db = db;
  next();
});

// app.use('/', indexRouter);
app.use("/user", usersRouter);
app.use("/car", carRouter);
app.use("/carDepot", carDepotRouter);
app.use("/garage", garageRouter);
app.use("/expenses", expensesRouter);
app.use("/chargeDetail", chargeDetailRouter);
app.use("/carReception", carReceptionRouter);
app.use("/carRepair", carRepairRouter);
app.use("/carProblem", carProblemRouter);
app.use("/invoice", invoiceRouter);
app.use("/sendMail", sendMailRouter);

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
