var express = require("express");
var router = express.Router();
const {
  getAlltypeOfMedia,
  insertTypeOfMedia,
} = require("../models/typeOfMedia");

router.get("/allTypeOfMedia", function (req, res) {
  getAlltypeOfMedia(req, res);
});

router.post("/addTypeOfMedia", async function (req, res) {
  insertTypeOfMedia(req, res);
});

module.exports = router;
