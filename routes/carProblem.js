var express = require("express");
var router = express.Router();
var carProblem = require("../models/carProblem");

router.get("/allCarProblem", function (req, res) {
  carProblem.getAllCarProblem(req, res);
});

router.post("/addCarProblem", async function (req, res) {
  carProblem.insertCarProblem(req, res);
});

module.exports = router;
