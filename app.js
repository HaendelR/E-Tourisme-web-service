const createError = require("http-errors");
const express = require("express");
const { json, urlencoded } = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongo = require("mongodb");
const monk = require("monk");

// Clean
const usersRouter = require("./routes/users.js");
const placeRouter = require("./routes/place.js");
const typeOfMediaRouter = require("./routes/typeOfMedia.js");
const activtyRouter = require("./routes/activity.js");
const activityTouristicSiteRouter = require("./routes/activityTouristicSite.js");
const touristicSiteRouter = require("./routes/touristicSite.js");
const mediaSiteRouter = require("./routes/mediaSite.js");
const commentRouter = require("./routes/comment.js");
const commentReplyRouter = require("./routes/commentReply.js");
const notificationRouter = require("./routes/notification.js");
const programRouter = require("./routes/program.js");

// To clean if not used
// import sendMailRouter from "./routes/sendMail";

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
app.use("/commentReply", commentReplyRouter);
app.use("/notification", notificationRouter);
app.use("/program", programRouter);

// To clean if not used
// app.use("/sendMail", sendMailRouter);

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
