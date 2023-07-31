var express = require("express");
var router = express.Router();
const { getAllMediaSite, insertMediaSite } = require("../models/mediaSite");

router.get("/allMediaSite", function (req, res) {
  getAllMediaSite(req, res);
});

router.post("/addMediaSite", async function (req, res) {
  insertMediaSite(req, res);
});

module.exports = router;
