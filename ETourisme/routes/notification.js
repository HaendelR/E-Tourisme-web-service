var express = require("express");
var router = express.Router();
const { insertNotification } = require("../models/notification");

router.post("/addNotification", async function (req, res) {
  insertNotification(req, res);
});

module.exports = router;
