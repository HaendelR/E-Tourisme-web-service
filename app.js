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
import typeOfMediaRouter from "./routes/typeOfMedia";
import activtyRouter from "./routes/activity";
import activityTouristicSiteRouter from "./routes/activityTouristicSite";
import touristicSiteRouter from "./routes/touristicSite";
import mediaSiteRouter from "./routes/mediaSite";
import commentRouter from "./routes/comment";

// To clean
import carRepairRouter from "./routes/carRepair";
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
app.use("/typeOfMedia", typeOfMediaRouter);
app.use("/activity", activtyRouter);
app.use("/activityTouristicSite", activityTouristicSiteRouter);
app.use("/touristicSite", touristicSiteRouter);
app.use("/mediaSite", mediaSiteRouter);
app.use("/comment", commentRouter);

// To clean
app.use("/carRepair", carRepairRouter);
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
