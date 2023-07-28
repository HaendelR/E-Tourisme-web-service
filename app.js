import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongo from "mongodb";
import monk from "monk";

// Clean
import usersRouter from "./routes/users";
import placeRouter from "./routes/place";

// To clean
import carDepotRouter from "./routes/carDepot";
import carRouter from "./routes/car";
import expensesRouter from "./routes/expenses";
import chargeDetailRouter from "./routes/chargeDetail";
import carReceptionRouter from "./routes/carReception";
import carRepairRouter from "./routes/carRepair";
import carProblemRouter from "./routes/carProblem";
import invoiceRouter from "./routes/invoice";
import sendMailRouter from "./routes/sendMail";



require("dotenv").config();
//var db = monk("localhost:27017/garage");
var db = monk(process.env.MONGO_DB_ATLAS);

// var indexRouter = require('./routes/index');
var app = express();
app.set("port", process.env.PORT || 3000);
// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(cors());
app.use(function (req, res, next) {
  req.db = db;
  next();
});

// app.use('/', indexRouter);
// Clean
app.use("/user", usersRouter);
app.use("/place", placeRouter);

// To clean
app.use("/car", carRouter);
app.use("/carDepot", carDepotRouter);
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

export default app;
