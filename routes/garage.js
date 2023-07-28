var express = require("express");
var router = express.Router();
var garage = require("../models/garage");

router.get("/allGarage", function (req, res) {
  garage.getAllgarage(req, res);
});

router.post("/addGarage", async function (req, res) {
  garage.insertGarage(req, res);
});

module.exports = router;
