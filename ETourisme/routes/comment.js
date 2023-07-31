var express = require("express");
var router = express.Router();
const {
  insertComment,
  getAllCommentTouristicSite,
} = require("../models/comment");

router.post("/addChargeDetail", async function (req, res) {
  insertComment(req, res);
});

router.get("/touristicSiteName", async function (req, res) {
  getAllCommentTouristicSite(req, res);
});

module.exports = router;
