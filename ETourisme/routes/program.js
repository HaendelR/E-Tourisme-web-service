var express = require("express");
var router = express.Router();
const { getAllProgram, insertProgram } = require("../models/program");

router.get("/allProgram", function (req, res) {
  getAllProgram(req, res);
});

router.post("/addProgram", async function (req, res) {
  insertProgram(req, res);
});

module.exports = router;
