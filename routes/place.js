var express = require("express");
var router = express.Router();
const { getAllPlace, insertPlace } = require("../models/place");

router.get("/allPlace", function (req, res) {
  getAllPlace(req, res);
});

router.post("/addPlace", async function (req, res) {
  insertPlace(req, res);
});

module.exports = router;
