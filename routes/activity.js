var express = require("express");
var router = express.Router();
const { getAllActivity, insertActivity } = require("../models/activity");

router.get("/allActivity", function (req, res) {
  getAllActivity(req, res);
});

router.post("/addActivity", async function (req, res) {
  insertActivity(req, res);
});

module.exports = router;
