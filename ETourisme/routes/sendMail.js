var express = require("express");
var sendMail = require("../models/sendMail");
var router = express.Router();

router.post("/", async function (req, res) {
  sendMail.getEmail(req, res);
});

module.exports = router;
