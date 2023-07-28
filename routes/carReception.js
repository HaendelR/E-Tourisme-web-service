var express = require("express");
var router = express.Router();
var carReception = require("../models/carReception");

router.get("/allCarReception", function (req, res) {
  carReception.getAllCarReception(req, res);
});

router.post("/addCarReception", async function (req, res) {
  carReception.insertCarReception(req, res);
});

module.exports = router;
